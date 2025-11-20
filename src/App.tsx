import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/dashboard/Posts";
import PostEditor from "./pages/dashboard/PostEditor";
import Categories from "./pages/dashboard/Categories";
import Analytics from "./pages/dashboard/Analytics";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Usucapiao from "./pages/services/Usucapiao";
import CompraVenda from "./pages/services/CompraVenda";
import Inventario from "./pages/services/Inventario";
import ContratoGaveta from "./pages/services/ContratoGaveta";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/servicos/usucapiao" element={<Usucapiao />} />
            <Route path="/servicos/compra-venda" element={<CompraVenda />} />
            <Route path="/servicos/inventario" element={<Inventario />} />
            <Route path="/servicos/contrato-gaveta" element={<ContratoGaveta />} />
            <Route path="/dashboard" element={<ProtectedRoute requireAdmin><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/posts" element={<ProtectedRoute requireAdmin><Posts /></ProtectedRoute>} />
            <Route path="/dashboard/posts/new" element={<ProtectedRoute requireAdmin><PostEditor /></ProtectedRoute>} />
            <Route path="/dashboard/posts/edit/:id" element={<ProtectedRoute requireAdmin><PostEditor /></ProtectedRoute>} />
            <Route path="/dashboard/categories" element={<ProtectedRoute requireAdmin><Categories /></ProtectedRoute>} />
            <Route path="/dashboard/analytics" element={<ProtectedRoute requireAdmin><Analytics /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
