import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, ClipboardCheck, FileImage } from "lucide-react";
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
          "border-2 border-dashed rounded-xl p-10 text-center transition-all",
          isDragging || isDragActive 
            ? "border-[#10b981] bg-[#f0fdf4] shadow-lg" 
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="bg-[#10b981] bg-opacity-10 rounded-full p-4 mx-auto mb-6 w-20 h-20 flex items-center justify-center">
          <Upload className="h-10 w-10 text-[#10b981]" />
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 mb-2">Upload your screenshot</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
          Drag and drop your image here, or click to browse
        </p>
        
        <div className="flex justify-center gap-4 mb-8">
          <Button className="bg-[#10b981] hover:bg-[#0d9669] text-white gap-2">
            <FileImage className="h-4 w-4" />
            <span>Select File</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-3 max-w-lg mx-auto gap-4 border-t border-gray-100 pt-6">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
              <ImageIcon className="h-5 w-5 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
              <ClipboardCheck className="h-5 w-5 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500">Paste from clipboard</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
              <span className="text-sm font-medium text-gray-500">30MB</span>
            </div>
            <p className="text-xs text-gray-500">Maximum file size</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
