import React, { useState } from "react";
import EditorCanvas from "@/components/editor/EditorCanvas";
import FrameTemplatesSidebar from "@/components/editor/FrameTemplatesSidebar";
import ControlsSidebar from "@/components/editor/ControlsSidebar";
import { EditorState } from "@/types";
import { Button } from "@/components/ui/button";
import { Save, Share2 } from "lucide-react";

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
      image: null,
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

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
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
      
      <div className="container max-w-[1400px] mx-auto py-6 px-4">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <FrameTemplatesSidebar
              selectedTemplate={editorState.frameTemplate}
              onSelectTemplate={handleFrameTemplateChange}
            />
          </div>
          
          <div className="col-span-12 md:col-span-7">
            <EditorCanvas
              editorState={editorState}
              onImageUpload={handleImageUpload}
              onReset={handleReset}
            />
          </div>
          
          <div className="col-span-12 md:col-span-3">
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
