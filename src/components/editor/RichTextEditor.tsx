import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { EditorToolbar } from './EditorToolbar';
import { useEffect, useCallback } from 'react';
import { formatBlogContent } from '@/lib/formatContent';
import { toast } from 'sonner';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none',
      },
    },
  });

  // Sync content prop with editor instance
  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Função para formatar o conteúdo
  const handleFormat = useCallback(() => {
    if (!editor) return;
    
    const currentContent = editor.getHTML();
    const formattedContent = formatBlogContent(currentContent);
    
    if (formattedContent !== currentContent) {
      editor.commands.setContent(formattedContent);
      onChange(formattedContent);
      toast.success('Conteúdo formatado com sucesso!');
    } else {
      toast.info('O conteúdo já está formatado.');
    }
  }, [editor, onChange]);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <EditorToolbar editor={editor} onFormat={handleFormat} />
      <div className="min-h-[400px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
