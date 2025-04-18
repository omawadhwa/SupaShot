import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, ClipboardCheck, FileImage, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onFileUpload: (file: File) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
    setIsDragging(false);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  // Handle paste from clipboard
  React.useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/')) {
          onFileUpload(file);
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onFileUpload]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div 
        {...getRootProps()}
        className={cn(
          "border border-dashed rounded-xl p-8 text-center transition-all backdrop-blur-sm",
          isDragging || isDragActive 
            ? "border-primary bg-primary/5 shadow-lg" 
            : "border-border hover:border-primary/50 hover:bg-muted/30"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="bg-primary/10 rounded-full p-3 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        
        <h3 className="text-lg font-medium mb-1">Upload your screenshot</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
          Drop image here or click to browse
        </p>
        
        <div className="flex items-center justify-center gap-3">
          <Button size="sm" variant="outline" className="rounded-full">
            <Camera className="h-4 w-4 mr-2" />
            <span>Capture Website</span>
          </Button>
          
          <Button size="sm" className="rounded-full">
            <FileImage className="h-4 w-4 mr-2" />
            <span>Select File</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-4 pt-4 mt-4 text-xs text-muted-foreground border-t border-border">
          <span className="flex items-center">
            <ImageIcon className="h-3 w-3 mr-1 inline" /> PNG, JPG, WEBP
          </span>
          <span className="flex items-center">
            <ClipboardCheck className="h-3 w-3 mr-1 inline" /> Paste from clipboard
          </span>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
