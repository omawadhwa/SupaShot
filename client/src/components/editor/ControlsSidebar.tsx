import React, { useState } from "react";
import { EditorState } from "@/types";
import ColorPicker from "./ColorPicker";
import { 
  Palette, 
  PanelBottom, 
  BoxSelect,
  Layers, 
  Type, 
  ChevronDown, 
  ChevronRight, 
  Droplets, 
  Wand2,
  Download,
  Grid3X3,
  DownloadCloud,
  Sliders,
  ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ControlsSidebarProps {
  editorState: EditorState;
  updateEditorState: (updates: Partial<EditorState>) => void;
}

// Predefined gradient options
const gradients = [
  { id: "g1", name: "Ivory", value: "from-[#f5f0e8] to-[#e6d9c2]" },
  { id: "g2", name: "Subtle Blue", value: "from-blue-100 to-cyan-100" },
  { id: "g3", name: "Soft Pink", value: "from-pink-100 to-purple-100" },
  { id: "g4", name: "Mint", value: "from-green-100 to-teal-100" },
  { id: "g5", name: "Peach", value: "from-orange-100 to-yellow-100" },
  { id: "g6", name: "Lavender", value: "from-indigo-100 to-purple-100" },
  { id: "g7", name: "Sunset", value: "from-orange-200 to-rose-200" },
  { id: "g8", name: "Ocean", value: "from-cyan-200 to-blue-200" },
];

const ControlsSidebar: React.FC<ControlsSidebarProps> = ({
  editorState,
  updateEditorState
}) => {
  const [activeTab, setActiveTab] = useState("style");

  const handleColorTypeChange = (type: "transparent" | "solid" | "gradient" | "image") => {
    updateEditorState({
      background: {
        type,
        value: type === "transparent" ? "transparent" :
               type === "solid" ? "#ffffff" :
               type === "gradient" ? "from-[#f5f0e8] to-[#e6d9c2]" : ""
      }
    });
  };

  const handleColorSelect = (color: string) => {
    updateEditorState({
      background: {
        ...editorState.background,
        value: color
      }
    });
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

  const handleShadowPosition = (position: { x: number; y: number }) => {
    updateEditorState({
      shadow: {
        ...editorState.shadow,
        position: {
          ...editorState.shadow.position,
          ...position
        }
      }
    });
  };

  // Solid colors swatches
  const colorSwatches = [
    "#ffffff", "#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1",
    "#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8",
    "#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa",
    "#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80",
    "#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#10b981",
    "#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24",
    "#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c",
    "#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171",
  ];

  // Determine if a gradient is selected
  const isGradientSelected = (gradient: string) => {
    return editorState.background.type === "gradient" && editorState.background.value === gradient;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-[calc(100vh-140px)] flex flex-col">
      {/* Controls header */}
      <div className="border-b border-gray-200 p-3 flex justify-between items-center">
        <div className="flex items-center">
          <Sliders className="h-5 w-5 text-[#10b981] mr-2" />
          <span className="font-medium text-gray-800">Style Controls</span>
        </div>
        <Badge 
          variant="outline" 
          className="text-xs bg-gray-100 text-gray-700"
        >
          Pro Features
        </Badge>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full rounded-none bg-white border-b">
            <TabsTrigger value="style" className="flex-1 text-xs data-[state=active]:border-b-2 data-[state=active]:border-[#10b981]">
              <Palette className="h-4 w-4 mr-1" />
              <span>Style</span>
            </TabsTrigger>
            <TabsTrigger value="effects" className="flex-1 text-xs data-[state=active]:border-b-2 data-[state=active]:border-[#10b981]">
              <Wand2 className="h-4 w-4 mr-1" />
              <span>Effects</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="flex-1 text-xs data-[state=active]:border-b-2 data-[state=active]:border-[#10b981]">
              <Download className="h-4 w-4 mr-1" />
              <span>Export</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Controls content */}
      <div className="overflow-y-auto flex-grow p-4">
        {activeTab === "style" && (
          <div className="space-y-6">
            {/* Background section */}
            <div className="space-y-3">
              <div className="flex items-center mb-1">
                <BoxSelect className="h-4 w-4 text-[#10b981] mr-2" />
                <h3 className="text-sm font-medium text-gray-800">Background</h3>
              </div>
              
              <div className="space-y-3">
                <Tabs 
                  defaultValue="transparent"
                  value={editorState.background.type}
                  onValueChange={(v) => handleColorTypeChange(v as any)}
                >
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger value="transparent" className="text-xs">None</TabsTrigger>
                    <TabsTrigger value="solid" className="text-xs">Solid</TabsTrigger>
                    <TabsTrigger value="gradient" className="text-xs">Gradient</TabsTrigger>
                    <TabsTrigger value="image" className="text-xs">Image</TabsTrigger>
                  </TabsList>
                  
                  {/* Solid color content */}
                  <TabsContent value="solid" className="mt-3">
                    <div className="grid grid-cols-8 gap-1.5">
                      {colorSwatches.map((color, index) => (
                        <button
                          key={index}
                          className={`w-6 h-6 rounded-md cursor-pointer transition-transform hover:scale-110 border ${
                            editorState.background.value === color ? 
                            'ring-2 ring-[#10b981] ring-offset-1' : 
                            'border-gray-200'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorSelect(color)}
                        />
                      ))}
                    </div>
                    <div className="mt-3">
                      <ColorPicker
                        color={editorState.background.value}
                        onChange={handleColorSelect}
                      />
                    </div>
                  </TabsContent>
                  
                  {/* Gradient content */}
                  <TabsContent value="gradient" className="mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      {gradients.map((gradient) => (
                        <button
                          key={gradient.id}
                          className={`h-12 rounded-md cursor-pointer bg-gradient-to-r ${gradient.value} transition-all ${
                            isGradientSelected(gradient.value) ? 
                            'ring-2 ring-[#10b981] ring-offset-1' : 
                            'border border-gray-200'
                          }`}
                          onClick={() => handleColorSelect(gradient.value)}
                        >
                          <span className="text-xs font-medium text-gray-700 bg-white bg-opacity-70 px-2 py-0.5 rounded">
                            {gradient.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Image content */}
                  <TabsContent value="image" className="mt-3">
                    <div className="text-center p-4 border border-dashed border-gray-300 rounded-lg">
                      <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Upload a background image</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Select Image
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Border section */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex items-center mb-1">
                <PanelBottom className="h-4 w-4 text-[#10b981] mr-2" />
                <h3 className="text-sm font-medium text-gray-800">Border</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Width</span>
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
                    <span>Corner Radius</span>
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
                  <div className="text-xs text-gray-500 mb-1">Color</div>
                  <ColorPicker 
                    color={editorState.border.color} 
                    onChange={handleBorderColorChange}
                  />
                </div>
              </div>
            </div>
            
            {/* Shadow section */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Droplets className="h-4 w-4 text-[#10b981] mr-2" />
                  <h3 className="text-sm font-medium text-gray-800">Shadow</h3>
                </div>
                <Switch 
                  checked={editorState.shadow.enabled}
                  onCheckedChange={handleShadowToggle}
                />
              </div>
              
              {editorState.shadow.enabled && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Intensity</span>
                      <span>{Math.round(editorState.shadow.intensity * 100)}%</span>
                    </div>
                    <Slider 
                      value={[editorState.shadow.intensity * 100]} 
                      min={0} 
                      max={100} 
                      step={1}
                      onValueChange={handleShadowIntensityChange}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Position</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 p-0"
                        onClick={() => handleShadowPosition({ x: -5, y: -5 })}
                      >
                        <span className="transform -rotate-45">↖</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 p-0"
                        onClick={() => handleShadowPosition({ x: 0, y: -5 })}
                      >
                        <span>↑</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 p-0"
                        onClick={() => handleShadowPosition({ x: 5, y: -5 })}
                      >
                        <span className="transform rotate-45">↗</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 p-0"
                        onClick={() => handleShadowPosition({ x: -5, y: 0 })}
                      >
                        <span>←</span>
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="h-8 p-0 bg-[#10b981] hover:bg-[#0d9669]"
                        onClick={() => handleShadowPosition({ x: 0, y: 10 })}
                      >
                        <Grid3X3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 p-0"
                        onClick={() => handleShadowPosition({ x: 5, y: 0 })}
                      >
                        <span>→</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 p-0"
                        onClick={() => handleShadowPosition({ x: -5, y: 5 })}
                      >
                        <span className="transform rotate-45">↙</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 p-0"
                        onClick={() => handleShadowPosition({ x: 0, y: 5 })}
                      >
                        <span>↓</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 p-0"
                        onClick={() => handleShadowPosition({ x: 5, y: 5 })}
                      >
                        <span className="transform -rotate-45">↘</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Blur</span>
                      <span>{editorState.shadow.position.blur}px</span>
                    </div>
                    <Slider 
                      value={[editorState.shadow.position.blur]} 
                      min={0} 
                      max={50} 
                      step={1}
                      onValueChange={(value) => 
                        updateEditorState({
                          shadow: {
                            ...editorState.shadow,
                            position: {
                              ...editorState.shadow.position,
                              blur: value[0]
                            }
                          }
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === "effects" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-800">Effects Library</h3>
              <Badge variant="outline" className="text-xs">Pro</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {["Noise", "Glass", "Duotone", "Blur", "Gloss", "Grain", "Vintage", "3D"].map((effect) => (
                <Button 
                  key={effect} 
                  variant="outline" 
                  className="h-auto py-2 justify-start"
                >
                  <Wand2 className="h-4 w-4 mr-2 text-[#10b981]" />
                  <span className="text-xs">{effect}</span>
                </Button>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Quick Adjustments</h3>
              <div className="space-y-3">
                {["Brightness", "Contrast", "Saturation", "Blur"].map((adjust) => (
                  <div key={adjust}>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{adjust}</span>
                      <span>100%</span>
                    </div>
                    <Slider value={[100]} min={0} max={200} step={1} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "export" && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-800 mb-3">Export Settings</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Format</label>
                  <Select defaultValue="png">
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpg">JPG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                      <SelectItem value="svg">SVG (Pro)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Quality</label>
                  <Slider value={[80]} min={0} max={100} step={1} />
                </div>
                
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Size</label>
                  <Select defaultValue="original">
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="original">Original Size</SelectItem>
                      <SelectItem value="1x">1× (Standard)</SelectItem>
                      <SelectItem value="2x">2× (Retina)</SelectItem>
                      <SelectItem value="custom">Custom Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="w-full mt-4 bg-[#10b981] hover:bg-[#0d9669] text-white gap-2">
                <DownloadCloud className="h-4 w-4" />
                <span>Export Image</span>
              </Button>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-800">Quick Export</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start gap-2">
                  <Download className="h-4 w-4" />
                  <span className="text-xs">PNG</span>
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Download className="h-4 w-4" />
                  <span className="text-xs">JPG</span>
                </Button>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 mt-2">
              <div className="flex items-center">
                <Badge className="bg-[#10b981] mr-2">PRO</Badge>
                <span className="text-xs text-gray-700">Access advanced export options</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlsSidebar;
