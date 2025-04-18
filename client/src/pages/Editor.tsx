import React, { useState } from "react";
import EditorCanvas from "@/components/editor/EditorCanvas";
import FrameTemplatesSidebar from "@/components/editor/FrameTemplatesSidebar";
import ControlsSidebar from "@/components/editor/ControlsSidebar";
import { EditorState } from "@/types";

const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    image: null,
    frameTemplate: "standard",
    background: {
      type: "transparent",
      value: "transparent"
    },
    border: {
      width: 0,
      color: "#000000",
      radius: 8
    },
    shadow: {
      enabled: true,
      color: "#000000",
      intensity: 0.2,
      position: {
        x: 0,
        y: 10,
        blur: 15,
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
        type: "transparent",
        value: "transparent"
      },
      border: {
        width: 0,
        color: "#000000",
        radius: 8
      },
      shadow: {
        enabled: true,
        color: "#000000",
        intensity: 0.2,
        position: {
          x: 0,
          y: 10,
          blur: 15,
          spread: 0
        }
      },
      effects: []
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <FrameTemplatesSidebar
          selectedTemplate={editorState.frameTemplate}
          onSelectTemplate={handleFrameTemplateChange}
        />
        
        <EditorCanvas
          editorState={editorState}
          onImageUpload={handleImageUpload}
          onReset={handleReset}
        />
        
        <ControlsSidebar
          editorState={editorState}
          updateEditorState={updateEditorState}
        />
      </div>
    </div>
  );
};

export default Editor;
