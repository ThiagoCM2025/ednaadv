import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { validateImage } from '@/lib/imageValidation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  currentImage?: string;
  onRemove?: () => void;
  accept?: Record<string, string[]>;
}

export function ImageUpload({ 
  onUploadComplete, 
  currentImage, 
  onRemove,
  accept = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
  }
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setIsUploading(true);

    try {
      // Criar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // Upload para o Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onUploadComplete(publicUrl);
      toast.success('Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Erro ao enviar imagem');
    } finally {
      setIsUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    disabled: isUploading,
  });

  const handleRemove = () => {
    setPreview(null);
    if (onRemove) onRemove();
  };

  if (preview) {
    return (
      <div className="relative group">
        <img
          src={preview}
          alt="Preview"
          className="w-full h-64 object-cover rounded-lg border"
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleRemove}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        transition-colors hover:border-primary
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-border'}
        ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        {isUploading ? (
          <Loader2 className="w-10 h-10 text-muted-foreground animate-spin" />
        ) : (
          <Upload className="w-10 h-10 text-muted-foreground" />
        )}
        <div>
          <p className="text-sm font-medium text-foreground">
            {isUploading ? 'Enviando...' : isDragActive ? 'Solte a imagem aqui' : 'Arraste uma imagem ou clique para selecionar'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            JPG, PNG ou WebP (máx. 5MB)
          </p>
        </div>
      </div>
    </div>
  );
}
