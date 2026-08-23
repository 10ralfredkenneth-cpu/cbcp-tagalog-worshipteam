import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  bucket: string;
  className?: string;
}

export function ImageUpload({ value, onChange, bucket, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    try {
      // Supabase has its own size limits configured on the bucket, 
      // but we can add a client-side check if needed. Default is usually 5MB.
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File is too large (max 5MB)');
        setIsUploading(false);
        return;
      }

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Supabase upload error:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onChange(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      console.error('Upload error details:', error);
      const errorMessage = error.message || error.error_description || 'Unknown upload error';
      toast.error('Failed to upload image: ' + errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // If the image is already a public URL, we might want to delete it from storage,
    // but often we just clear the field to allow replacement.
    onChange('');
    toast.success('Image removed. Save to persist changes.');
  };

  return (
    <div className={className}>
      {value ? (
        <div className="relative w-full aspect-square border border-accent/10 overflow-hidden group">
          <img src={value} alt="Profile" className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-none h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-accent/10 bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-accent/40 mb-3" />
                <p className="text-[10px] uppercase tracking-widest text-accent font-bold">Upload Photo</p>
              </>
            )}
          </div>
          <input type="file" className="hidden" onChange={handleUpload} disabled={isUploading} accept="image/*" />
        </label>
      )}
    </div>
  );
}
