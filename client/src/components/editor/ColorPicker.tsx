import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const predefinedColors = [
  "#000000", "#ffffff", "#f44336", "#e91e63", "#9c27b0",
  "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
  "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b",
  "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e"
];

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [localColor, setLocalColor] = React.useState(color);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalColor(e.target.value);
    onChange(e.target.value);
  };

  const handlePredefinedColorSelect = (selectedColor: string) => {
    setLocalColor(selectedColor);
    onChange(selectedColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-5 h-5 rounded-full border border-gray-300" 
              style={{ backgroundColor: localColor }}
            />
            <span>{localColor}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="mb-3">
          <input
            type="color"
            value={localColor}
            onChange={handleColorChange}
            className="w-full h-8 cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-5 gap-2">
          {predefinedColors.map((colorOption) => (
            <button
              key={colorOption}
              className={cn(
                "w-8 h-8 rounded-full transition-transform hover:scale-110",
                colorOption === localColor ? "ring-2 ring-offset-2 ring-[#10b981]" : ""
              )}
              style={{ backgroundColor: colorOption }}
              onClick={() => handlePredefinedColorSelect(colorOption)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
