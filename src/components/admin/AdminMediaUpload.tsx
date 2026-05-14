import React, { useRef, useState } from 'react';
import { LoaderCircle, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getSupabaseBrowserClient } from '../../lib/supabase-browser';

export const AdminMediaUpload = ({
  onUploadSuccess,
  currentImageUrl,
}: {
  onUploadSuccess: (url: string) => void;
  currentImageUrl?: string;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      onUploadSuccess(publicUrl);
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {currentImageUrl && (
        <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-border shadow-sm mx-auto">
          <img src={currentImageUrl} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}

      <div
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all cursor-pointer',
          isUploading && 'opacity-50 cursor-wait',
        )}
      >
        <div className="w-12 h-12 rounded-xl bg-muted/5 flex items-center justify-center mb-4 group-hover:bg-brand-primary/10 transition-all">
          {isUploading ? (
            <LoaderCircle className="w-6 h-6 text-brand-primary animate-spin" />
          ) : (
            <Plus className="w-6 h-6 text-muted group-hover:text-brand-primary transition-all" />
          )}
        </div>
        <p className="text-sm font-medium text-foreground mb-1">
          {isUploading ? 'Uploading...' : 'Upload Media'}
        </p>
        <p className="text-xs text-muted">Click to upload (JPG, PNG, GIF up to 10MB)</p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
          disabled={isUploading}
        />
      </div>
    </div>
  );
};
