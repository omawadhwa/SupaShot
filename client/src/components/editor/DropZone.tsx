import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
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
    <div className="p-8 max-w-md mx-auto">
      <div 
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragging || isDragActive ? "border-[#10b981] bg-[#f0fdf4]" : "border-gray-300"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
        <p className="text-sm text-gray-500">Drop your screenshot here or</p>
        <div className="mt-3 flex justify-center">
          <Button className="bg-[#10b981] hover:bg-[#0d9669] text-white">
            Select File
          </Button>
        </div>
        <p className="mt-2 text-xs text-gray-400">or paste from clipboard</p>
      </div>
    </div>
  );
};

export default DropZone;
