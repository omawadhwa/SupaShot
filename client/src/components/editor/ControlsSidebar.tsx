import React from "react";
import { EditorState } from "@/types";
import ColorPicker from "./ColorPicker";
import { 
  Palette, 
  PanelBottom, 
  BoxSelect,
  Droplets, 
  Wand2,
  Download,
  Grid3X3,
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
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

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

  const handleShadowBlurChange = (value: number[]) => {
    updateEditorState({
      shadow: {
        ...editorState.shadow,
        position: {
          ...editorState.shadow.position,
          blur: value[0]
        }
      }
    });
  };

  const handleShadowSpreadChange = (value: number[]) => {
    updateEditorState({
      shadow: {
        ...editorState.shadow,
        position: {
          ...editorState.shadow.position,
          spread: value[0]
        }
      }
    });
  };

  const handleShadowColorChange = (color: string) => {
    updateEditorState({
      shadow: {
        ...editorState.shadow,
        color
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
  
  // Convert Tailwind gradient format to CSS gradient
  const getGradientBackground = (gradientValue: string) => {
    let fromColor = '#f5f0e8';
    let toColor = '#e6d9c2';
    
    // Extract from color
    if (gradientValue.includes('from-[')) {
      const fromMatch = gradientValue.match(/from-\[(.*?)\]/);
      if (fromMatch && fromMatch[1]) {
        fromColor = fromMatch[1];
      }
    } else if (gradientValue.includes('from-')) {
      const fromMatch = gradientValue.match(/from-([a-zA-Z0-9-]+)/);
      if (fromMatch && fromMatch[1]) {
        // Handle Tailwind color classes
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
    if (gradientValue.includes('to-[')) {
      const toMatch = gradientValue.match(/to-\[(.*?)\]/);
      if (toMatch && toMatch[1]) {
        toColor = toMatch[1];
      }
    } else if (gradientValue.includes('to-')) {
      const toMatch = gradientValue.match(/to-([a-zA-Z0-9-]+)/);
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
    
    return `linear-gradient(to right, ${fromColor}, ${toColor})`;
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="p-4 space-y-4">
        <Accordion type="single" collapsible defaultValue="background" className="w-full">
          {/* Background Accordion */}
          <AccordionItem value="background" className="border rounded-lg mb-3">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <div className="flex items-center">
                <BoxSelect className="h-4 w-4 text-[#10b981] mr-2" />
                <h3 className="text-sm font-medium text-gray-800">Background</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
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
                          className={`h-12 rounded-md cursor-pointer transition-all ${
                            isGradientSelected(gradient.value) ? 
                            'ring-2 ring-[#10b981] ring-offset-1' : 
                            'border border-gray-200'
                          }`}
                          style={{
                            background: getGradientBackground(gradient.value)
                          }}
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
            </AccordionContent>
          </AccordionItem>
          
          {/* Border Accordion */}
          <AccordionItem value="border" className="border rounded-lg mb-3">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <div className="flex items-center">
                <PanelBottom className="h-4 w-4 text-[#10b981] mr-2" />
                <h3 className="text-sm font-medium text-gray-800">Border</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
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
            </AccordionContent>
          </AccordionItem>
          
          {/* Shadow Accordion */}
          <AccordionItem value="shadow" className="border rounded-lg mb-3">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-2">
                <div className="flex items-center">
                  <Droplets className="h-4 w-4 text-[#10b981] mr-2" />
                  <h3 className="text-sm font-medium text-gray-800">Shadow</h3>
                </div>
                <Switch 
                  checked={editorState.shadow.enabled}
                  onCheckedChange={handleShadowToggle}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
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
                  
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Blur</span>
                      <span>{editorState.shadow.position.blur}px</span>
                    </div>
                    <Slider 
                      value={[editorState.shadow.position.blur]} 
                      min={0} 
                      max={100} 
                      step={1}
                      onValueChange={handleShadowBlurChange}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Spread</span>
                      <span>{editorState.shadow.position.spread}px</span>
                    </div>
                    <Slider 
                      value={[editorState.shadow.position.spread]} 
                      min={0} 
                      max={50} 
                      step={1}
                      onValueChange={handleShadowSpreadChange}
                    />
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Color</div>
                    <ColorPicker 
                      color={editorState.shadow.color} 
                      onChange={handleShadowColorChange}
                    />
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
          
          {/* Effects Accordion */}
          <AccordionItem value="effects" className="border rounded-lg mb-3">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <div className="flex items-center">
                <Wand2 className="h-4 w-4 text-[#10b981] mr-2" />
                <h3 className="text-sm font-medium text-gray-800">Effects</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="p-4 text-center border border-dashed border-gray-300 rounded-lg">
                <Wand2 className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <h3 className="text-sm font-medium text-gray-800 mb-1">Effects Coming Soon</h3>
                <p className="text-xs text-gray-500">
                  Advanced image effects will be available in the next update.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Export Accordion */}
          <AccordionItem value="export" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <div className="flex items-center">
                <Download className="h-4 w-4 text-[#10b981] mr-2" />
                <h3 className="text-sm font-medium text-gray-800">Export</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Format</span>
                    <Select defaultValue="png">
                      <SelectTrigger className="w-24 h-8">
                        <SelectValue placeholder="Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="jpg">JPG</SelectItem>
                        <SelectItem value="webp">WebP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quality</span>
                    <Select defaultValue="high">
                      <SelectTrigger className="w-24 h-8">
                        <SelectValue placeholder="Quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Size</span>
                    <Select defaultValue="original">
                      <SelectTrigger className="w-24 h-8">
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="original">Original</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="small">Small</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button className="w-full bg-[#10b981] hover:bg-[#0d9669] gap-2">
                  <Download className="h-4 w-4" />
                  <span>Export Image</span>
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Upgrade to PRO for watermark-free exports and more formats.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ControlsSidebar;