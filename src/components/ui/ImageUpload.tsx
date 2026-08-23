import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  bucket: string;
  className?: string;
}

export function ImageUpload({ value, onChange, bucket, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      const msg = 'Please upload an image file (PNG, JPG, etc.)';
      setError(msg);
      toast.error(msg);
      return;
    }

    // Validate file size (max 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      const msg = 'Image is too large. Maximum size is 5MB.';
      setError(msg);
      toast.error(msg);
      return;
    }

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    try {
      // Check if file is valid
      if (!file.name) throw new Error('Invalid file name');

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
      setError(errorMessage);
      toast.error('Failed to upload image: ' + errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className={className}>
      <div className="space-y-3">
        {value ? (
          <div className="relative w-full aspect-square border border-accent/10 overflow-hidden group">
            <img src={value} alt="Profile" className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <label className="cursor-pointer bg-accent text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest hover:bg-accent/90 transition-colors">
                Change
                <input type="file" className="hidden" onChange={handleUpload} disabled={isUploading} accept="image/*" />
              </label>
              <Button
                type="button"
                variant="destructive"
                className="rounded-none h-7 px-3 text-[10px] font-bold uppercase tracking-widest"
                onClick={handleRemove}
              >
                Remove
              </Button>
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-accent animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <label className={cn(
            "flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed transition-all duration-300 cursor-pointer",
            error ? "border-red-500/50 bg-red-500/5" : "border-accent/10 bg-muted/20 hover:bg-muted/30 hover:border-accent/30"
          )}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
              {isUploading ? (
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
              ) : (
                <>
                  <Upload className={cn("w-8 h-8 mb-3", error ? "text-red-500/50" : "text-accent/40")} />
                  <p className={cn("text-[10px] uppercase tracking-widest font-bold", error ? "text-red-500" : "text-accent")}>
                    {error ? 'Upload Failed' : 'Upload Photo'}
                  </p>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground mt-2 leading-relaxed">
                    JPG, PNG up to 5MB
                  </p>
                </>
              )}
            </div>
            <input type="file" className="hidden" onChange={handleUpload} disabled={isUploading} accept="image/*" />
          </label>
        )}
        
        {error && (
          <div className="flex items-start gap-2 text-red-500 animate-in fade-in slide-in-from-top-1 duration-300">
            <X className="w-3 h-3 mt-0.5 shrink-0" />
            <p className="text-[9px] uppercase tracking-widest font-bold leading-tight">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
