import React from "react";
import { cn } from "@/lib/utils";
import { LayoutTemplate, Search, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FrameTemplatesSidebarProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const frameTemplates = [
  {
    id: "standard",
    name: "Standard",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-full h-24 rounded-lg shadow-sm"></div>
    ),
  },
  {
    id: "rotated-right",
    name: "Rotated Right",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-full h-20 rounded-lg shadow-sm transform rotate-3"></div>
    ),
  },
  {
    id: "rotated-left",
    name: "Rotated Left",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-full h-20 rounded-lg shadow-sm transform -rotate-3"></div>
    ),
  },
  {
    id: "browser",
    name: "Browser Frame",
    thumbnail: (active: boolean) => (
      <div className="w-full">
        <div className="h-6 bg-gray-200 rounded-t-lg flex items-center px-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="bg-gray-100 w-full h-16 border-x border-b border-gray-300"></div>
      </div>
    ),
  },
  {
    id: "split",
    name: "Split View",
    thumbnail: (active: boolean) => (
      <div className="flex w-full gap-1">
        <div className="bg-gray-100 flex-1 h-20 rounded-lg border border-gray-300 shadow-sm"></div>
        <div className="bg-gray-100 flex-1 h-20 rounded-lg border border-gray-300 shadow-sm"></div>
      </div>
    ),
  },
  {
    id: "circular",
    name: "Circular",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-20 h-20 mx-auto rounded-full border border-gray-300 shadow-sm"></div>
    ),
  },
  {
    id: "rounded",
    name: "Rounded",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-full h-20 rounded-2xl shadow-sm"></div>
    ),
  },
  {
    id: "phone",
    name: "Phone Frame",
    thumbnail: (active: boolean) => (
      <div className="w-16 h-28 mx-auto bg-black rounded-xl p-1">
        <div className="w-full h-full rounded-lg bg-gray-100 relative">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black rounded-full"></div>
        </div>
      </div>
    ),
  },
  {
    id: "mac",
    name: "Mac Window",
    thumbnail: (active: boolean) => (
      <div className="w-full rounded-lg border border-gray-300 overflow-hidden">
        <div className="h-5 bg-gray-200 flex items-center px-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="bg-gray-100 w-full h-16"></div>
      </div>
    ),
  }
];

const FrameTemplatesSidebar: React.FC<FrameTemplatesSidebarProps> = ({ 
  selectedTemplate, 
  onSelectTemplate 
}) => {
  return (
    <div className="h-full bg-white overflow-hidden flex flex-col">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center mb-3">
          <LayoutTemplate className="h-5 w-5 text-[#10b981] mr-2" />
          <h2 className="font-medium text-gray-800">Frame Templates</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search templates..." 
            className="pl-8 py-1 h-9 text-sm"
          />
        </div>
      </div>
      
      <div className="p-3 overflow-y-auto flex-grow">
        <div className="grid grid-cols-1 gap-4">
          {frameTemplates.map((template) => (
            <div key={template.id} className="space-y-1">
              <button
                className={cn(
                  "frame-template w-full bg-white border p-3 rounded-lg cursor-pointer flex items-center justify-center transition-all hover:shadow-md",
                  selectedTemplate === template.id
                    ? "border-[#10b981] border-2"
                    : "border-gray-200 hover:border-[#10b981]"
                )}
                onClick={() => onSelectTemplate(template.id)}
                title={template.name}
              >
                {template.thumbnail(selectedTemplate === template.id)}
              </button>
              <p className="text-xs text-center text-gray-600">{template.name}</p>
            </div>
          ))}
          
          <button className="w-full mt-4 text-sm text-gray-600 py-2 px-4 rounded-md border border-dashed border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center">
            <PlusCircle className="h-4 w-4 mr-2 text-[#10b981]" />
            Custom Frame
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrameTemplatesSidebar;
