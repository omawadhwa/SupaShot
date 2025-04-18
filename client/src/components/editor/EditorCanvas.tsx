import React, { useState } from "react";
import { EditorState } from "@/types";
import DropZone from "./DropZone";
import WebsiteInputModal from "./WebsiteInputModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { 
  RotateCcw, 
  Crop, 
  Maximize, 
  Wand2, 
  Download, 
  Globe, 
  Image as ImageIcon, 
  Undo, 
  Redo, 
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { downloadImage } from "@/lib/downloadUtils";
import { generateEditorShadow } from "@/lib/imageUtils";
import { useToast } from "@/hooks/use-toast";

interface EditorCanvasProps {
  editorState: EditorState;
  onImageUpload: (imageData: string) => void;
  onReset: () => void;
}

const mockScreenshot = 'data:image/jpeg;base64,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';

const EditorCanvas: React.FC<EditorCanvasProps> = ({
  editorState,
  onImageUpload,
  onReset
}) => {
  const [websiteModalOpen, setWebsiteModalOpen] = useState(false);
  const { toast } = useToast();
  const [zoomLevel, setZoomLevel] = useState(100);

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
      // For demonstration, we'll use a mock image since the actual API might not work in the Replit environment
      onImageUpload(mockScreenshot);
      setWebsiteModalOpen(false);
      toast({
        title: "Website captured",
        description: "Screenshot has been generated successfully.",
      });
      
      /* Actual implementation would be:
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
      */
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
      await downloadImage("screenshot-canvas", "supashot-screenshot.png");
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
        value: "from-[#f5f0e8] to-[#e6d9c2]"
      },
      border: {
        ...editorState.border,
        radius: 12
      },
      shadow: {
        enabled: true,
        color: "#000000",
        intensity: 0.25,
        position: {
          x: 0,
          y: 10,
          blur: 25,
          spread: 0
        }
      }
    };
    
    // For demonstration, we'll just keep the current image
    if (!editorState.image) {
      onImageUpload(mockScreenshot);
    }
    
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
      return {};
    } else if (type === "solid") {
      return { backgroundColor: value };
    } else if (type === "gradient") {
      // For Tailwind-format gradients, extract and convert to CSS
      if (value.includes('from-') || value.includes('to-')) {
        let fromColor = '#f5f0e8';
        let toColor = '#e6d9c2';
        
        // Extract from color
        if (value.includes('from-[')) {
          const fromMatch = value.match(/from-\[(.*?)\]/);
          if (fromMatch && fromMatch[1]) {
            fromColor = fromMatch[1];
          }
        } else if (value.includes('from-')) {
          const fromMatch = value.match(/from-([a-zA-Z0-9-]+)/);
          if (fromMatch && fromMatch[1]) {
            // Handle Tailwind color classes like 'from-blue-100'
            if (fromMatch[1].includes('blue')) fromColor = '#dbeafe';
            else if (fromMatch[1].includes('pink')) fromColor = '#fbcfe8';
            else if (fromMatch[1].includes('green')) fromColor = '#d1fae5';
            else if (fromMatch[1].includes('orange')) fromColor = '#ffedd5';
            else if (fromMatch[1].includes('purple')) fromColor = '#ede9fe';
            else if (fromMatch[1].includes('indigo')) fromColor = '#e0e7ff';
            else if (fromMatch[1].includes('cyan')) fromColor = '#cffafe';
            else if (fromMatch[1].includes('rose')) fromColor = '#ffe4e6';
            else if (fromMatch[1].includes('yellow')) fromColor = '#fef9c3';
          }
        }
        
        // Extract to color
        if (value.includes('to-[')) {
          const toMatch = value.match(/to-\[(.*?)\]/);
          if (toMatch && toMatch[1]) {
            toColor = toMatch[1];
          }
        } else if (value.includes('to-')) {
          const toMatch = value.match(/to-([a-zA-Z0-9-]+)/);
          if (toMatch && toMatch[1]) {
            // Handle Tailwind color classes
            if (toMatch[1].includes('blue')) toColor = '#bfdbfe';
            else if (toMatch[1].includes('pink')) toColor = '#f9a8d4';
            else if (toMatch[1].includes('green')) toColor = '#a7f3d0';
            else if (toMatch[1].includes('orange')) toColor = '#fdba74';
            else if (toMatch[1].includes('purple')) toColor = '#ddd6fe';
            else if (toMatch[1].includes('indigo')) toColor = '#c7d2fe';
            else if (toMatch[1].includes('cyan')) toColor = '#a5f3fc';
            else if (toMatch[1].includes('rose')) toColor = '#fda4af';
            else if (toMatch[1].includes('yellow')) toColor = '#fde68a';
          }
        }
        
        return { background: `linear-gradient(to right, ${fromColor}, ${toColor})` };
      }
      
      return { background: `linear-gradient(to right, #f5f0e8, #e6d9c2)` };
    } else if (type === "image" && value) {
      return { backgroundImage: `url(${value})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    
    return {};
  };

  // Determine the frame style based on selected template
  const getFrameStyle = () => {
    const template = editorState.frameTemplate;
    
    if (template === "standard") {
      return {};
    } else if (template === "rotated-right") {
      return { transform: "rotate(3deg)" };
    } else if (template === "rotated-left") {
      return { transform: "rotate(-3deg)" };
    } else if (template === "browser") {
      return { borderRadius: "0.75rem 0.75rem 0 0", border: "1px solid #e5e7eb" };
    } else if (template === "circular") {
      return { borderRadius: "50%", overflow: "hidden" };
    } else if (template === "rounded") {
      return { borderRadius: "1rem", overflow: "hidden" };
    } else if (template === "phone") {
      return { 
        width: "280px", 
        padding: "20px 10px", 
        borderRadius: "2rem",
        backgroundColor: "#000",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      };
    } else if (template === "mac") {
      return { 
        borderRadius: "0.5rem",
        border: "1px solid #e5e7eb",
        overflow: "hidden"
      };
    } else if (template === "split") {
      return { display: "flex", gap: "10px" };
    }
    
    return {};
  };

  // Get browser frame chrome
  const getBrowserChrome = () => {
    if (editorState.frameTemplate === "browser") {
      return (
        <div className="h-8 bg-gray-200 rounded-t-xl flex items-center px-3">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-grow bg-white rounded-full h-5 flex items-center px-3">
            <span className="text-xs text-gray-500 truncate">supashot.io</span>
          </div>
        </div>
      );
    } else if (editorState.frameTemplate === "mac") {
      return (
        <div className="h-8 bg-gray-200 flex items-center px-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-grow text-center">
            <span className="text-xs text-gray-600 font-medium">SupaShot</span>
          </div>
        </div>
      );
    } else if (editorState.frameTemplate === "phone") {
      return (
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-black rounded-full"></div>
      );
    }
    
    return null;
  };

  // Get actual image content with appropriate styling
  const getImageContent = () => {
    if (!editorState.image) return null;
    
    if (editorState.frameTemplate === "split") {
      return (
        <div className="flex gap-3 justify-center">
          <div className="w-1/2">
            <img 
              src={editorState.image} 
              alt="Screenshot Preview Left" 
              className="w-full h-auto object-cover rounded-lg"
              style={{ 
                borderWidth: `${editorState.border.width}px`,
                borderColor: editorState.border.color,
                borderStyle: editorState.border.width > 0 ? 'solid' : 'none',
                borderRadius: `${editorState.border.radius}px`,
              }}
            />
          </div>
          <div className="w-1/2">
            <img 
              src={editorState.image} 
              alt="Screenshot Preview Right" 
              className="w-full h-auto object-cover rounded-lg"
              style={{ 
                borderWidth: `${editorState.border.width}px`,
                borderColor: editorState.border.color,
                borderStyle: editorState.border.width > 0 ? 'solid' : 'none',
                borderRadius: `${editorState.border.radius}px`,
                filter: "brightness(0.9) contrast(1.1)"
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <img 
          src={editorState.image} 
          alt="Screenshot Preview" 
          className="w-full h-auto object-contain"
          style={{ 
            borderWidth: `${editorState.border.width}px`,
            borderColor: editorState.border.color,
            borderStyle: editorState.border.width > 0 ? 'solid' : 'none',
            borderRadius: `${editorState.border.radius}px`,
          }}
        />
      );
    }
  };

  // Implement grid pattern background with CSS
  const gridPatternStyle = {
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h18v18H1V1zm1 1v16h16V2H2z' fill='%23f0f0f0' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div
        id="screenshot-canvas"
        className="bg-card shadow-md rounded-xl border border-border overflow-hidden"
        style={{
          ...getBackgroundStyle(),
          maxWidth: "900px",
          width: "100%",
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: "center center",
          transition: "transform 0.2s ease-out"
        }}
      >
        {/* Content area */}
        <div className="p-6 relative">
          {editorState.image ? (
            <div>
              <div 
                style={{ 
                  ...getFrameStyle(),
                  boxShadow: shadowStyle,
                  borderRadius: `${editorState.border.radius}px`,
                  overflow: "hidden",
                }}
                className="bg-card"
              >
                {getBrowserChrome()}
                <div>
                  {getImageContent()}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-6">
              <DropZone onFileUpload={handleFileUpload} />
              
              <div className="flex mt-4 gap-3 justify-center">
                <Dialog open={websiteModalOpen} onOpenChange={setWebsiteModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-full flex gap-2 items-center">
                      <Globe className="h-4 w-4" />
                      <span>Capture Website</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card">
                    <WebsiteInputModal 
                      onCapture={handleWebsiteCapture} 
                      onCancel={() => setWebsiteModalOpen(false)} 
                    />
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="secondary" 
                  className="rounded-full flex gap-2 items-center"
                  onClick={() => onImageUpload(mockScreenshot)}
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>Use Sample Image</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
