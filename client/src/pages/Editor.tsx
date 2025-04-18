import React, { useState } from "react";
import EditorCanvas from "@/components/editor/EditorCanvas";
import FrameTemplatesSidebar from "@/components/editor/FrameTemplatesSidebar";
import ControlsSidebar from "@/components/editor/ControlsSidebar";
import { EditorState } from "@/types";
import { Button } from "@/components/ui/button";
import { Save, Share2, RotateCcw, Crop, Maximize, Wand2, Download } from "lucide-react";
import { downloadImage } from "@/lib/downloadUtils";

const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorState>({
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

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="w-full bg-white p-3 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">SupaShot Editor</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Share2 size={16} />
            <span>Share</span>
          </Button>
          <Button className="bg-[#10b981] hover:bg-[#0d9669] text-white gap-2">
            <Save size={16} />
            <span>Save Project</span>
          </Button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-grow flex overflow-hidden">
        {/* Left sidebar - fixed width */}
        <div className="w-64 border-r border-gray-200 bg-white">
          <FrameTemplatesSidebar
            selectedTemplate={editorState.frameTemplate}
            onSelectTemplate={handleFrameTemplateChange}
          />
        </div>
        
        {/* Center area - editor canvas */}
        <div className="flex-grow flex flex-col">
          <div className="flex-grow overflow-auto p-6 flex items-center justify-center">
            <EditorCanvas
              editorState={editorState}
              onImageUpload={handleImageUpload}
              onReset={handleReset}
            />
          </div>
          
          {/* Bottom toolbar */}
          <div className="p-3 border-t flex justify-center gap-3 bg-white">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset} 
              className="flex items-center gap-1"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <Crop className="h-4 w-4" />
              <span>Crop</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <Maximize className="h-4 w-4" />
              <span>Fit</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleAutoEnhance}
            >
              <Wand2 className="h-4 w-4 text-[#10b981]" />
              <span>Auto Enhance</span>
            </Button>
            
            <Button 
              size="sm" 
              className="flex items-center gap-1 bg-[#10b981] hover:bg-[#0d9669] text-white"
              onClick={handleExport}
              disabled={!editorState.image}
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
        
        {/* Right sidebar - fixed width */}
        <div className="w-80 border-l border-gray-200 bg-white">
          <ControlsSidebar
            editorState={editorState}
            updateEditorState={updateEditorState}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
