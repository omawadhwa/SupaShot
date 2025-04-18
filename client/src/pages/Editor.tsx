import React, { useState, useEffect } from "react";
import EditorCanvas from "@/components/editor/EditorCanvas";
import FrameTemplatesSidebar from "@/components/editor/FrameTemplatesSidebar";
import ControlsSidebar from "@/components/editor/ControlsSidebar";
import { EditorState } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  RotateCcw, Crop, Maximize, Wand2, Download, 
  ZoomIn, ZoomOut, RotateCw, Undo, Redo,
  Square
} from "lucide-react";
import { downloadImage } from "@/lib/downloadUtils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    image: undefined,
    frameTemplate: "standard",
    background: {
      type: "gradient",
      value: "from-[#32b2f7] to-[#1877d6]" // Updated to blue gradient
    },
    border: {
      width: 0,
      color: "#000000",
      radius: 12
    },
    shadow: {
      enabled: true,
      color: "#000000",
      intensity: 0.25,
      position: {
        x: 0,
        y: 10,
        blur: 20,
        spread: 0
      }
    },
    effects: []
  });
  
  // Add the template selection function to the window object for navbar access
  useEffect(() => {
    window.updateEditorTemplate = (templateId: string) => {
      handleFrameTemplateChange(templateId);
    };
    
    return () => {
      // Clean up when component unmounts
      delete window.updateEditorTemplate;
    };
  }, []);

  const updateEditorState = (updates: Partial<EditorState>) => {
    setEditorState(prev => ({
      ...prev,
      ...updates
    }));
  };

  const handleFrameTemplateChange = (templateId: string) => {
    updateEditorState({ frameTemplate: templateId });
  };

  const handleImageUpload = (imageData: string) => {
    updateEditorState({ image: imageData });
  };

  const handleReset = () => {
    setEditorState({
      image: undefined,
      frameTemplate: "standard",
      background: {
        type: "gradient",
        value: "from-[#f5f0e8] to-[#e6d9c2]"
      },
      border: {
        width: 0,
        color: "#000000",
        radius: 12
      },
      shadow: {
        enabled: true,
        color: "#000000",
        intensity: 0.25,
        position: {
          x: 0,
          y: 10,
          blur: 20,
          spread: 0
        }
      },
      effects: []
    });
  };

  const handleAutoEnhance = () => {
    updateEditorState({
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
    });
  };

  const handleExport = async () => {
    if (!editorState.image) return;
    
    try {
      await downloadImage("screenshot-canvas", "supashot-screenshot.png");
    } catch (error) {
      console.error("Error exporting image:", error);
    }
  };

  // State for aspect ratio menu
  const [zoomLevel, setZoomLevel] = useState(100);

  // Aspect ratio handling
  const handleAspectRatioChange = (ratio: string) => {
    // This would be implemented to apply aspect ratio to the image
    console.log(`Changing aspect ratio to: ${ratio}`);
  };

  // Handlers for new functionality
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 50));
  const handleFit = () => setZoomLevel(100);
  const handleUndo = () => console.log('Undo operation');
  const handleRedo = () => console.log('Redo operation');
  const handleCrop = () => console.log('Crop operation');

  return (
    <div className="h-[calc(100vh-64px)] fixed top-16 left-0 right-0 bottom-0 flex flex-col bg-background">
      {/* Main content area */}
      <div className="flex h-full">
        {/* Left sidebar - 3D transforms only */}
        <div className="w-64 border-r border-border h-full overflow-hidden flex flex-col bg-card">
          <div className="p-3 border-b border-border bg-card">
            <h1 className="font-medium text-primary">3D Transforms</h1>
          </div>
          <div className="overflow-auto flex-grow p-4">
            {/* 3D Transform Controls will go here */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Rotation</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="aspect-square h-12 rounded-md"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="aspect-square h-12 rounded-md"
                  >
                    <RotateCw className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="aspect-square h-12 rounded-md"
                  >
                    <span className="text-lg font-semibold">3D</span>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <div className="w-full aspect-video bg-muted rounded-md flex items-center justify-center">
                  <div className="text-sm text-muted-foreground">Transform Preview</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Center area - editor canvas (now scrollable) */}
        <div className="flex-grow flex flex-col relative">
          {/* Editor canvas - now scrollable */}
          <div className="flex-grow overflow-auto flex items-center justify-center p-8">
            <EditorCanvas
              editorState={editorState}
              onImageUpload={handleImageUpload}
              onReset={handleReset}
            />
          </div>
          
          {/* Bottom floating toolbar */}
          <div className="sticky bottom-4 z-30 mx-auto mt-auto flex max-w-[860px] select-none items-center gap-1.5 gap-y-3 rounded-[20px] border border-border bg-card p-2 shadow-md">
            <div className="flex items-center gap-1 mr-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleUndo} 
                className="h-8 w-8 rounded-full"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRedo} 
                className="h-8 w-8 rounded-full"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-6 w-[1px] bg-border mx-1"></div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset} 
              className="flex items-center gap-1 rounded-full"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCrop}
              className="flex items-center gap-1 rounded-full"
            >
              <Crop className="h-4 w-4" />
              <span>Crop</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleFit}
              className="flex items-center gap-1 rounded-full"
            >
              <Maximize className="h-4 w-4" />
              <span>Fit</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 rounded-full"
                >
                  <Square className="h-4 w-4" />
                  <span>Aspect Ratio</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuItem onClick={() => handleAspectRatioChange("1:1")}>
                  1:1 (Square)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAspectRatioChange("4:3")}>
                  4:3
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAspectRatioChange("16:9")}>
                  16:9
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAspectRatioChange("2:1")}>
                  2:1
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAspectRatioChange("custom")}>
                  Custom...
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 rounded-full"
              onClick={handleAutoEnhance}
            >
              <Wand2 className="h-4 w-4 text-primary" />
              <span>Auto Enhance</span>
            </Button>
            
            <div className="h-6 w-[1px] bg-border mx-1"></div>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleZoomOut} 
                className="h-8 w-8 rounded-full"
                disabled={zoomLevel <= 50}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs w-12 text-center">{zoomLevel}%</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleZoomIn} 
                className="h-8 w-8 rounded-full"
                disabled={zoomLevel >= 200}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-6 w-[1px] bg-border mx-1"></div>
            
            <Button 
              size="sm" 
              className="flex items-center gap-1 rounded-full"
              onClick={handleExport}
              disabled={!editorState.image}
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
        
        {/* Right sidebar - fixed width */}
        <div className="w-80 border-l border-border h-full overflow-hidden flex flex-col bg-card">
          <div className="p-3 border-b border-border bg-card">
            <h1 className="font-medium text-primary">Style Controls</h1>
          </div>
          <div className="overflow-auto flex-grow">
            <ControlsSidebar
              editorState={editorState}
              updateEditorState={updateEditorState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
