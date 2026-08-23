import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  bucket: string;
  className?: string;
}

const DEFAULT_PLACEHOLDER = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop&q=80&auto=format";

export function ImageUpload({ value, onChange, bucket, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!file) return;

    // Supported formats including HEIC (which browser won't preview directly usually, 
    // but we check type or extension)
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(file.type) && !['heic', 'heif'].includes(fileExt || '')) {
      toast.error('Please upload a valid image file (PNG, JPG, WEBP, or HEIC)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File is too large (max 5MB)');
      return;
    }

    // Show preview step
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setPendingFile(file);
    };
    reader.readAsDataURL(file);
  };

  const executeUpload = async () => {
    if (!pendingFile) return;

    setIsUploading(true);
    setUploadProgress(10);
    
    const fileExt = pendingFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    try {
      setUploadProgress(30);
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, pendingFile, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      setUploadProgress(80);
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setUploadProgress(100);
      onChange(publicUrl);
      setPreviewUrl(null);
      setPendingFile(null);
      toast.success('Avatar uploaded successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Upload failed: ' + (error.message || 'Unknown error'));
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const cancelPreview = () => {
    setPreviewUrl(null);
    setPendingFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
    toast.success('Avatar removed');
  };

  const onDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);

  const currentDisplayUrl = previewUrl || value || DEFAULT_PLACEHOLDER;

  return (
    <div className={cn("space-y-4", className)}>
      <div 
        className={cn(
          "relative w-full aspect-square border-2 transition-all duration-300 overflow-hidden group",
          dragActive ? "border-accent bg-accent/5 scale-[1.02]" : "border-accent/10 bg-muted/20",
          !value && !previewUrl && "border-dashed"
        )}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        <img 
          src={currentDisplayUrl} 
          alt="Avatar Preview" 
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            !previewUrl && !value && "opacity-40 grayscale",
            (value || previewUrl) && "group-hover:scale-105"
          )} 
        />
        
        {/* Overlay for actions or status */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          {!previewUrl && (
            <div className="flex flex-col items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="rounded-none uppercase text-[10px] tracking-widest font-bold"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-3 h-3 mr-2" /> Replace
              </Button>
              {value && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="rounded-none uppercase text-[10px] tracking-widest font-bold"
                  onClick={handleRemove}
                >
                  <X className="w-3 h-3 mr-2" /> Remove
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Uploading Progress */}
        {isUploading && (
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-md flex flex-col items-center justify-center p-6 space-y-4 z-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
            <div className="w-full max-w-[120px] space-y-2">
              <Progress value={uploadProgress} className="h-1 bg-accent/20" />
              <p className="text-[8px] uppercase tracking-[0.2em] text-accent text-center font-bold">Uploading {uploadProgress}%</p>
            </div>
          </div>
        )}

        {/* Drag and Drop Prompt */}
        {!value && !previewUrl && !isUploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
            <Upload className={cn("w-8 h-8 mb-3 transition-colors", dragActive ? "text-accent" : "text-accent/30")} />
            <p className="text-[10px] uppercase tracking-widest text-accent font-bold">
              {dragActive ? "Drop here" : "Drag & Drop or Click"}
            </p>
            <p className="text-[8px] text-muted-foreground mt-2 uppercase tracking-widest">PNG, JPG, WEBP, HEIC (Max 5MB)</p>
          </div>
        )}

        {/* Preview Confirmation */}
        {previewUrl && !isUploading && (
          <div className="absolute inset-0 bg-accent/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-30 animate-in fade-in zoom-in-95 duration-200">
            <Check className="w-8 h-8 text-primary mb-2" />
            <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-4">Preview New Avatar</p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="rounded-none bg-primary text-accent hover:bg-primary/90 uppercase text-[9px] tracking-widest font-bold h-9"
                onClick={executeUpload}
              >
                Save Change
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="rounded-none border-primary/20 text-primary hover:bg-primary/10 uppercase text-[9px] tracking-widest font-bold h-9"
                onClick={cancelPreview}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileChange(file);
        }} 
        disabled={isUploading} 
        accept="image/png,image/jpeg,image/webp,image/heic,image/heif" 
      />
    </div>
  );
}
