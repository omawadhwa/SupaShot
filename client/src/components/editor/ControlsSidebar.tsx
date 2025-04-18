import React, { useState } from "react";
import { EditorState } from "@/types";
import ColorPicker from "./ColorPicker";
import { 
  Palette, 
  PanelBottomDashed, 
  Layers, 
  Type, 
  ChevronDown, 
  ChevronRight, 
  Droplets, 
  Wand2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ControlsSidebarProps {
  editorState: EditorState;
  updateEditorState: (updates: Partial<EditorState>) => void;
}

const ControlsSidebar: React.FC<ControlsSidebarProps> = ({
  editorState,
  updateEditorState
}) => {
  const [openSections, setOpenSections] = useState({
    colors: true,
    border: false,
    backdrop: true,
    fonts: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleColorTypeChange = (type: "transparent" | "solid" | "gradient" | "image") => {
    updateEditorState({
      background: {
        type,
        value: type === "transparent" ? "transparent" :
               type === "solid" ? "#ffffff" :
               type === "gradient" ? "from-[#e6d9c2] to-[#f5f0e8]" : ""
      }
    });
  };

  const handleColorSelect = (color: string) => {
    if (editorState.background.type === "solid") {
      updateEditorState({
        background: {
          ...editorState.background,
          value: color
        }
      });
    } else if (editorState.background.type === "gradient") {
      // For gradient, we use predefined gradients
      updateEditorState({
        background: {
          ...editorState.background,
          value: color
        }
      });
    }
  };

  const handleBorderWidthChange = (value: number[]) => {
    updateEditorState({
      border: {
        ...editorState.border,
        width: value[0]
      }
    });
  };

  const handleBorderRadiusChange = (value: number[]) => {
    updateEditorState({
      border: {
        ...editorState.border,
        radius: value[0]
      }
    });
  };

  const handleBorderColorChange = (color: string) => {
    updateEditorState({
      border: {
        ...editorState.border,
        color
      }
    });
  };

  const handleShadowToggle = (enabled: boolean) => {
    updateEditorState({
      shadow: {
        ...editorState.shadow,
        enabled
      }
    });
  };

  const handleShadowIntensityChange = (value: number[]) => {
    updateEditorState({
      shadow: {
        ...editorState.shadow,
        intensity: value[0] / 100
      }
    });
  };

  // Color swatches
  const colorSwatches = [
    "#6366f1", "#ef4444", "#f97316", "#f59e0b", "#84cc16",
    "#10b981", "#14b8a6", "#06b6d4", "#3b82f6", "#6366f1",
    "#8b5cf6", "#d946ef", "#ec4899", "#f43f5e", "from-pink-500 to-purple-500",
    "#0ea5e9", "#22d3ee", "#fb7185", "from-cyan-500 to-blue-500", "from-orange-400 to-pink-600"
  ];

  return (
    <div className="w-full lg:w-80 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden lg:h-[calc(100vh-140px)] flex flex-col">
      {/* Controls header */}
      <div className="border-b border-gray-200 p-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-medium text-gray-700">Sand Light</span>
        </div>
        <Button size="sm" className="bg-[#10b981] hover:bg-[#0d9669] text-white">
          Save
        </Button>
      </div>
      
      {/* Controls content with accordion sections */}
      <div className="overflow-y-auto flex-grow">
        {/* Colors Section */}
        <div className="border-b border-gray-200">
          <button 
            className="w-full px-4 py-3 text-left flex justify-between items-center"
            onClick={() => toggleSection("colors")}
          >
            <div className="flex items-center">
              <Palette className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium text-gray-700">Colors</span>
            </div>
            {openSections.colors ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          <div className={cn("px-4 pb-4", openSections.colors ? "block" : "hidden")}>
            {/* Type selector */}
            <Tabs 
              defaultValue="transparent"
              value={editorState.background.type}
              onValueChange={(v) => handleColorTypeChange(v as any)}
              className="mb-4"
            >
              <TabsList className="w-full">
                <TabsTrigger value="transparent" className="flex-1 text-xs">
                  Transp
                </TabsTrigger>
                <TabsTrigger value="solid" className="flex-1 text-xs">
                  Solid
                </TabsTrigger>
                <TabsTrigger value="gradient" className="flex-1 text-xs">
                  Gradient
                </TabsTrigger>
                <TabsTrigger value="image" className="flex-1 text-xs">
                  Image
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Color swatches grid */}
            {editorState.background.type !== "transparent" && (
              <div className="grid grid-cols-5 gap-2 mb-3">
                {colorSwatches.map((color, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 rounded-md cursor-pointer transition-transform hover:scale-110 ${
                      color.startsWith("from") ? "bg-gradient-to-r " + color : ""
                    }`}
                    style={!color.startsWith("from") ? { backgroundColor: color } : {}}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
            >
              <Palette className="h-4 w-4 mr-1" />
              Show More
            </Button>
          </div>
        </div>
        
        {/* Border Section */}
        <div className="border-b border-gray-200">
          <button 
            className="w-full px-4 py-3 text-left flex justify-between items-center"
            onClick={() => toggleSection("border")}
          >
            <div className="flex items-center">
              <PanelBottomDashed className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium text-gray-700">Border</span>
            </div>
            {openSections.border ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          <div className={cn("px-4 pb-4", openSections.border ? "block" : "hidden")}>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Border Width</span>
                  <span>{editorState.border.width}px</span>
                </div>
                <Slider 
                  value={[editorState.border.width]} 
                  min={0} 
                  max={10} 
                  step={1}
                  onValueChange={handleBorderWidthChange}
                />
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Border Radius</span>
                  <span>{editorState.border.radius}px</span>
                </div>
                <Slider 
                  value={[editorState.border.radius]} 
                  min={0} 
                  max={50} 
                  step={1}
                  onValueChange={handleBorderRadiusChange}
                />
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1">Border Color</div>
                <ColorPicker 
                  color={editorState.border.color} 
                  onChange={handleBorderColorChange}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Backdrop Section */}
        <div className="border-b border-gray-200">
          <button 
            className="w-full px-4 py-3 text-left flex justify-between items-center"
            onClick={() => toggleSection("backdrop")}
          >
            <div className="flex items-center">
              <Layers className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium text-gray-700">Backdrop</span>
            </div>
            {openSections.backdrop ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          <div className={cn("px-4 pb-4", openSections.backdrop ? "block" : "hidden")}>
            <div className="flex gap-4 mb-4">
              <Button 
                variant="outline" 
                className="flex-1 py-2 text-sm"
              >
                <Droplets className="h-4 w-4 mr-1" />
                Shadow
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 py-2 text-sm"
              >
                <Wand2 className="h-4 w-4 mr-1" />
                Effects
              </Button>
            </div>
            
            {/* Shadow controls */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Frame Shadow</span>
                <Switch 
                  checked={editorState.shadow.enabled}
                  onCheckedChange={handleShadowToggle}
                />
              </div>
              
              {editorState.shadow.enabled && (
                <>
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Color</div>
                    <div className="h-6 w-full bg-gradient-to-r from-gray-200 to-gray-700 rounded-md"></div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Intensity</span>
                      <span>{Math.round(editorState.shadow.intensity * 100)}%</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-500">Low</span>
                      <Slider 
                        value={[editorState.shadow.intensity * 100]} 
                        min={0} 
                        max={100} 
                        step={1}
                        onValueChange={handleShadowIntensityChange}
                        className="flex-grow"
                      />
                      <span className="text-xs text-gray-500">High</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Position</div>
                    <div className="grid grid-cols-3 gap-1 h-20">
                      {[...Array(9)].map((_, i) => (
                        <Button
                          key={i}
                          variant={i === 4 ? "default" : "outline"}
                          className={i === 4 ? "bg-[#10b981] hover:bg-[#0d9669]" : ""}
                          size="sm"
                        >
                          {i === 4 && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <line x1="12" y1="8" x2="12" y2="16"/>
                              <line x1="8" y1="12" x2="16" y2="12"/>
                            </svg>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Fonts Section */}
        <div className="border-b border-gray-200">
          <button 
            className="w-full px-4 py-3 text-left flex justify-between items-center"
            onClick={() => toggleSection("fonts")}
          >
            <div className="flex items-center">
              <Type className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium text-gray-700">Fonts</span>
            </div>
            {openSections.fonts ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          <div className={cn("px-4 pb-4", openSections.fonts ? "block" : "hidden")}>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Base Font</div>
                <Button variant="outline" className="w-full justify-between">
                  <span>Inter</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1">Code Font</div>
                <Button variant="outline" className="w-full justify-between">
                  <span>JetBrains Mono</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlsSidebar;
