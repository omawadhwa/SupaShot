import React from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutTemplate, Search, PlusCircle, Image, 
  MonitorSmartphone, Smartphone, Code
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface FrameTemplatesSidebarProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const frameTemplates = [
  // Basic frames
  {
    id: "standard",
    name: "Screenshot",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-full h-24 rounded-lg shadow-sm flex items-center justify-center">
        <Image className={active ? "text-[#10b981]" : "text-gray-400"} size={20} />
      </div>
    ),
  },
  {
    id: "rounded",
    name: "Rounded",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-full h-20 rounded-2xl shadow-sm flex items-center justify-center">
        <Image className={active ? "text-[#10b981]" : "text-gray-400"} size={20} />
      </div>
    ),
  },
  {
    id: "circular",
    name: "Circular",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-20 h-20 mx-auto rounded-full border border-gray-300 shadow-sm flex items-center justify-center">
        <Image className={active ? "text-[#10b981]" : "text-gray-400"} size={20} />
      </div>
    ),
  },
  {
    id: "rotated-right",
    name: "Rotated Right",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-full h-20 rounded-lg shadow-sm transform rotate-3 flex items-center justify-center">
        <Image className={active ? "text-[#10b981]" : "text-gray-400"} size={20} />
      </div>
    ),
  },
  {
    id: "rotated-left",
    name: "Rotated Left",
    thumbnail: (active: boolean) => (
      <div className="bg-gray-100 w-full h-20 rounded-lg shadow-sm transform -rotate-3 flex items-center justify-center">
        <Image className={active ? "text-[#10b981]" : "text-gray-400"} size={20} />
      </div>
    ),
  },
  
  // Device mockups
  {
    id: "browser",
    name: "Browser Window",
    thumbnail: (active: boolean) => (
      <div className="w-full">
        <div className="h-6 bg-gray-200 rounded-t-lg flex items-center px-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="bg-gray-100 w-full h-16 border-x border-b border-gray-300 flex items-center justify-center">
          <MonitorSmartphone className={active ? "text-[#10b981]" : "text-gray-400"} size={20} />
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
        <div className="bg-gray-100 w-full h-16 flex items-center justify-center">
          <MonitorSmartphone className={active ? "text-[#10b981]" : "text-gray-400"} size={20} />
        </div>
      </div>
    ),
  },
  {
    id: "phone",
    name: "iPhone",
    thumbnail: (active: boolean) => (
      <div className="w-16 h-28 mx-auto bg-black rounded-xl p-1">
        <div className="w-full h-full rounded-lg bg-gray-100 relative flex items-center justify-center">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black rounded-full"></div>
          <Smartphone className={active ? "text-[#10b981]" : "text-gray-400"} size={20} />
        </div>
      </div>
    ),
  },
  {
    id: "android",
    name: "Android Phone",
    thumbnail: (active: boolean) => (
      <div className="w-16 h-28 mx-auto bg-black rounded-md p-1">
        <div className="w-full h-full bg-gray-100 relative flex items-center justify-center">
          <Smartphone className={active ? "text-[#10b981]" : "text-gray-400"} size={20} />
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 border border-gray-400 rounded-full"></div>
        </div>
      </div>
    ),
  },
  
  // Social Media
  {
    id: "x-post",
    name: "X Post",
    thumbnail: (active: boolean) => (
      <div className="w-full bg-white border border-gray-200 rounded-md p-2">
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-gray-300 mr-1"></div>
          <div className="flex-grow h-2 bg-gray-200"></div>
        </div>
        <div className="h-12 bg-gray-100 rounded-md"></div>
      </div>
    ),
  },
  {
    id: "reddit-post",
    name: "Reddit Post",
    thumbnail: (active: boolean) => (
      <div className="w-full bg-white border border-gray-200 rounded-md p-2">
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-orange-300 mr-1"></div>
          <div className="flex-grow h-2 bg-gray-200"></div>
        </div>
        <div className="h-12 bg-gray-100 rounded-md"></div>
      </div>
    ),
  },
  {
    id: "bluesky-post",
    name: "Bluesky Post",
    thumbnail: (active: boolean) => (
      <div className="w-full bg-white border border-gray-200 rounded-md p-2">
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-blue-300 mr-1"></div>
          <div className="flex-grow h-2 bg-gray-200"></div>
        </div>
        <div className="h-12 bg-gray-100 rounded-md"></div>
      </div>
    ),
  },
  {
    id: "youtube-thumbnail",
    name: "YouTube Thumbnail",
    thumbnail: (active: boolean) => (
      <div className="w-full h-20 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center relative">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-red-500 translate-x-0.5"></div>
        </div>
      </div>
    ),
  },
  {
    id: "instagram-post",
    name: "Instagram Post",
    thumbnail: (active: boolean) => (
      <div className="w-full aspect-square bg-gray-100 border border-gray-200 rounded-md flex flex-col">
        <div className="h-6 p-1 flex items-center">
          <div className="w-4 h-4 rounded-full bg-gray-300 mr-1"></div>
          <div className="flex-grow h-2 bg-gray-200"></div>
        </div>
        <div className="flex-grow"></div>
        <div className="h-6 p-1">
          <div className="w-full h-2 bg-gray-200"></div>
        </div>
      </div>
    ),
  },
  {
    id: "instagram-story",
    name: "Instagram Story",
    thumbnail: (active: boolean) => (
      <div className="w-14 h-24 mx-auto bg-gray-100 border border-gray-200 rounded-md"></div>
    ),
  },
  
  // Other formats
  {
    id: "code",
    name: "Code Snippet",
    thumbnail: (active: boolean) => (
      <div className="w-full bg-gray-800 rounded-md p-2 flex flex-col gap-1">
        <div className="h-2 w-1/2 bg-purple-400"></div>
        <div className="h-2 w-3/4 bg-blue-400"></div>
        <div className="h-2 w-1/2 bg-green-400"></div>
        <div className="h-2 w-2/3 bg-yellow-400"></div>
        <div className="h-2 w-1/3 bg-pink-400"></div>
      </div>
    ),
  },
  {
    id: "github",
    name: "GitHub Contributions",
    thumbnail: (active: boolean) => (
      <div className="w-full bg-white rounded-md p-2 border border-gray-200">
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 49 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 ${
                Math.random() > 0.7 
                  ? active ? "bg-[#10b981]" : "bg-green-200" 
                  : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "split",
    name: "Split View",
    thumbnail: (active: boolean) => (
      <div className="flex w-full gap-1">
        <div className="bg-gray-100 flex-1 h-20 rounded-lg border border-gray-300 shadow-sm flex items-center justify-center">
          <Image className={active ? "text-[#10b981]" : "text-gray-400"} size={16} />
        </div>
        <div className="bg-gray-200 flex-1 h-20 rounded-lg border border-gray-300 shadow-sm flex items-center justify-center">
          <Image className={active ? "text-[#10b981]" : "text-gray-400"} size={16} />
        </div>
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
