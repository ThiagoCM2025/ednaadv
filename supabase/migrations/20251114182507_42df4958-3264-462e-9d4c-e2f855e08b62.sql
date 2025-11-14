-- Criar enum para roles
create type public.app_role as enum ('admin', 'user');

-- Tabela de user_roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamp with time zone default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Função security definer para verificar roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Policies para user_roles
create policy "Users can view own roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

create policy "Admins can view all roles"
  on public.user_roles for select
  using (public.has_role(auth.uid(), 'admin'));

-- Tabela de profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger para criar profile automaticamente
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Tabela de posts do blog
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_url text,
  author_id uuid references public.profiles(id) on delete cascade not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  meta_title text,
  meta_description text,
  category text,
  reading_time integer
);

create index blog_posts_slug_idx on public.blog_posts(slug);
create index blog_posts_status_idx on public.blog_posts(status);
create index blog_posts_author_idx on public.blog_posts(author_id);
create index blog_posts_published_at_idx on public.blog_posts(published_at desc);

alter table public.blog_posts enable row level security;

create policy "Published posts are viewable by everyone"
  on public.blog_posts for select
  using (status = 'published' or public.has_role(auth.uid(), 'admin'));

create policy "Admins can insert posts"
  on public.blog_posts for insert
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update posts"
  on public.blog_posts for update
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete posts"
  on public.blog_posts for delete
  using (public.has_role(auth.uid(), 'admin'));

-- Função para atualizar updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_blog_posts_updated
  before update on public.blog_posts
  for each row execute procedure public.handle_updated_at();

-- Tabela de visualizações
create table public.blog_views (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.blog_posts(id) on delete cascade not null,
  viewed_at timestamp with time zone default now(),
  user_agent text,
  referrer text,
  ip_address text
);

create index blog_views_post_id_idx on public.blog_views(post_id);
create index blog_views_viewed_at_idx on public.blog_views(viewed_at desc);

alter table public.blog_views enable row level security;

create policy "Anyone can insert views"
  on public.blog_views for insert
  with check (true);

create policy "Admins can view all views"
  on public.blog_views for select
  using (public.has_role(auth.uid(), 'admin'));

-- View para estatísticas agregadas
create or replace view public.blog_post_stats as
select 
  bp.id,
  bp.title,
  bp.slug,
  bp.status,
  bp.published_at,
  count(bv.id) as total_views,
  count(distinct date_trunc('day', bv.viewed_at)) as days_with_views
from public.blog_posts bp
left join public.blog_views bv on bp.id = bv.post_id
group by bp.id, bp.title, bp.slug, bp.status, bp.published_at;

-- Criar bucket para imagens do blog
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true);

-- RLS Policies para o bucket
create policy "Public can view blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

create policy "Admins can upload blog images"
  on storage.objects for insert
  with check (
    bucket_id = 'blog-images' 
    and public.has_role(auth.uid(), 'admin')
  );

create policy "Admins can update blog images"
  on storage.objects for update
  using (
    bucket_id = 'blog-images' 
    and public.has_role(auth.uid(), 'admin')
  );

create policy "Admins can delete blog images"
  on storage.objects for delete
  using (
    bucket_id = 'blog-images' 
    and public.has_role(auth.uid(), 'admin')
  );