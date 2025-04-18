import React from "react";
import { cn } from "@/lib/utils";

interface FrameTemplatesSidebarProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const frameTemplates = [
  {
    id: "standard",
    name: "Standard",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-16 h-16 rounded"></div>
    ),
  },
  {
    id: "rotated-right",
    name: "Rotated Right",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-16 h-12 rounded transform rotate-6"></div>
    ),
  },
  {
    id: "rotated-left",
    name: "Rotated Left",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-16 h-12 rounded transform -rotate-6"></div>
    ),
  },
  {
    id: "browser",
    name: "Browser",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-16 h-14 rounded-t-lg border border-gray-300"></div>
    ),
  },
  {
    id: "split",
    name: "Split",
    thumbnail: (active: boolean) => (
      <div className="flex">
        <div className="bg-gray-100 w-7 h-14 rounded border border-gray-300 mr-0.5"></div>
        <div className="bg-gray-100 w-7 h-14 rounded border border-gray-300 ml-0.5"></div>
      </div>
    ),
  },
  {
    id: "circular",
    name: "Circular",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-16 h-16 rounded-full border border-gray-300"></div>
    ),
  },
  {
    id: "rounded",
    name: "Rounded",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-14 h-16 rounded-xl"></div>
    ),
  },
];

const FrameTemplatesSidebar: React.FC<FrameTemplatesSidebarProps> = ({ 
  selectedTemplate, 
  onSelectTemplate 
}) => {
  return (
    <div className="w-full lg:w-24 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:h-[calc(100vh-140px)] p-2">
      {frameTemplates.map((template) => (
        <button
          key={template.id}
          className={cn(
            "frame-template bg-white border p-1 rounded-lg cursor-pointer w-20 h-20 flex items-center justify-center flex-shrink-0 transition-all hover:translate-y-[-2px]",
            selectedTemplate === template.id
              ? "border-[#10b981] border-2"
              : "border-gray-200 hover:border-[#10b981]"
          )}
          onClick={() => onSelectTemplate(template.id)}
          title={template.name}
        >
          {template.thumbnail(selectedTemplate === template.id)}
        </button>
      ))}
      
      <button className="mt-auto text-xs text-gray-600 py-2 px-4 rounded-md border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <rect x="2" y="2" width="8" height="8" rx="2" ry="2"/>
        </svg>
        More
      </button>
    </div>
  );
};

export default FrameTemplatesSidebar;
