import React, { useState } from "react";
import { EditorState } from "@/types";
import DropZone from "./DropZone";
import WebsiteInputModal from "./WebsiteInputModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RotateCcw, Crop, Expand, Wand2, Download } from "lucide-react";
import { downloadImage } from "@/lib/downloadUtils";
import { generateEditorShadow } from "@/lib/imageUtils";
import { useToast } from "@/hooks/use-toast";

interface EditorCanvasProps {
  editorState: EditorState;
  onImageUpload: (imageData: string) => void;
  onReset: () => void;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({
  editorState,
  onImageUpload,
  onReset
}) => {
  const [websiteModalOpen, setWebsiteModalOpen] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string);
          toast({
            title: "Image uploaded successfully",
            description: "Your screenshot is ready to be customized.",
          });
        }
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleWebsiteCapture = async (url: string) => {
    try {
      const response = await fetch('/api/screenshots/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to capture website: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        onImageUpload(data.imageData);
        setWebsiteModalOpen(false);
        toast({
          title: "Website captured",
          description: "Screenshot has been generated successfully.",
        });
      } else {
        throw new Error(data.message || "Failed to capture website");
      }
    } catch (error) {
      console.error("Error capturing website:", error);
      toast({
        title: "Capture failed",
        description: (error as Error).message || "Failed to capture website screenshot",
        variant: "destructive",
      });
    }
  };

  const handleExport = async () => {
    if (!editorState.image) {
      toast({
        title: "Export failed",
        description: "Please upload or capture a screenshot first.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await downloadImage("screenshot-canvas", "beautified-screenshot.png");
      toast({
        title: "Export successful",
        description: "Your beautified screenshot has been downloaded.",
      });
    } catch (error) {
      console.error("Error exporting image:", error);
      toast({
        title: "Export failed",
        description: "Failed to export image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAutoEnhance = () => {
    // Auto-enhance the image with predefined settings
    const enhancedState: Partial<EditorState> = {
      background: {
        type: "gradient",
        value: "linear-gradient(to right, #e6d9c2, #f5f0e8)"
      },
      border: {
        ...editorState.border,
        radius: 12
      },
      shadow: {
        enabled: true,
        color: "#000000",
        intensity: 0.2,
        position: {
          x: 0,
          y: 10,
          blur: 25,
          spread: 0
        }
      }
    };
    
    // Apply the enhanced state
    onImageUpload(editorState.image!);
    
    toast({
      title: "Auto-enhance applied",
      description: "Your screenshot has been automatically enhanced.",
    });
  };

  // Generate shadow style based on editor state
  const shadowStyle = generateEditorShadow(editorState.shadow);

  // Generate background style based on editor state
  const getBackgroundStyle = () => {
    const { type, value } = editorState.background;
    
    if (type === "transparent") {
      return "bg-transparent";
    } else if (type === "solid") {
      return `bg-[${value}]`;
    } else if (type === "gradient") {
      return `bg-gradient-to-r ${value}`;
    } else {
      return `bg-[url(${value})] bg-cover bg-center`;
    }
  };

  // Determine the frame style based on selected template
  const getFrameStyle = () => {
    const template = editorState.frameTemplate;
    
    const styles: Record<string, string> = {
      standard: "",
      "rotated-right": "transform rotate-3",
      "rotated-left": "transform -rotate-3",
      browser: "rounded-t-xl border border-gray-300",
      split: "",
      circular: "rounded-full overflow-hidden",
      rounded: "rounded-xl overflow-hidden",
    };
    
    return styles[template] || "";
  };

  // Implement grid pattern background with CSS
  const gridPatternStyle = {
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h18v18H1V1zm1 1v16h16V2H2z' fill='%23f0f0f0' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="relative w-full max-w-2xl mx-auto bg-[#e6d9c2] rounded-lg p-5 shadow-lg">
        {/* Canvas with grid pattern */}
        <div 
          id="screenshot-canvas"
          className="bg-white rounded-lg overflow-hidden w-full aspect-[4/3] relative"
          style={gridPatternStyle}
        >
          {/* Drop zone / Preview area */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {editorState.image ? (
              <div 
                className={`p-8 max-w-xl mx-auto ${getFrameStyle()}`}
                style={{ boxShadow: shadowStyle }}
              >
                <img 
                  src={editorState.image} 
                  alt="Screenshot Preview" 
                  className={`w-full h-auto rounded-[${editorState.border.radius}px] object-contain`}
                  style={{ 
                    borderWidth: `${editorState.border.width}px`,
                    borderColor: editorState.border.color,
                    borderStyle: editorState.border.width > 0 ? 'solid' : 'none',
                  }}
                />
              </div>
            ) : (
              <DropZone onFileUpload={handleFileUpload} />
            )}
            
            {/* Website screenshot input */}
            <Dialog open={websiteModalOpen} onOpenChange={setWebsiteModalOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="absolute bottom-8 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Capture Website Screenshot
                </Button>
              </DialogTrigger>
              <DialogContent>
                <WebsiteInputModal onCapture={handleWebsiteCapture} onCancel={() => setWebsiteModalOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Bottom toolbar */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onReset} className="flex items-center">
              <RotateCcw className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Crop className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Expand className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center"
              onClick={handleAutoEnhance}
            >
              <Wand2 className="h-4 w-4 text-[#10b981] mr-1" />
              <span className="hidden sm:inline">Auto</span>
            </Button>
            <Button 
              size="sm" 
              className="flex items-center bg-[#10b981] hover:bg-[#0d9669] text-white"
              onClick={handleExport}
              disabled={!editorState.image}
            >
              <Download className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
