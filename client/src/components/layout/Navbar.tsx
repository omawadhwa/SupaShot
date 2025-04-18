import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Menu, User, Sparkles, ChevronDown, LayoutTemplate, Image, MonitorSmartphone, Code } from "lucide-react";

// Import frame templates data
const frameTemplates = [
  // Basic frames
  { id: "standard", name: "Screenshot", category: "Basic", icon: Image },
  { id: "rounded", name: "Rounded", category: "Basic", icon: Image },
  { id: "circular", name: "Circular", category: "Basic", icon: Image },
  { id: "rotated-right", name: "Rotated Right", category: "Basic", icon: Image },
  { id: "rotated-left", name: "Rotated Left", category: "Basic", icon: Image },
  
  // Device mockups
  { id: "browser", name: "Browser Window", category: "Device", icon: MonitorSmartphone },
  { id: "mac", name: "Mac Window", category: "Device", icon: MonitorSmartphone },
  { id: "phone", name: "iPhone", category: "Device", icon: MonitorSmartphone },
  { id: "android", name: "Android Phone", category: "Device", icon: MonitorSmartphone },
  
  // Social Media
  { id: "x-post", name: "X Post", category: "Social", icon: LayoutTemplate },
  { id: "reddit-post", name: "Reddit Post", category: "Social", icon: LayoutTemplate },
  { id: "bluesky-post", name: "Bluesky Post", category: "Social", icon: LayoutTemplate },
  { id: "youtube-thumbnail", name: "YouTube Thumbnail", category: "Social", icon: LayoutTemplate },
  { id: "instagram-post", name: "Instagram Post", category: "Social", icon: LayoutTemplate },
  { id: "instagram-story", name: "Instagram Story", category: "Social", icon: LayoutTemplate },
  
  // Other formats
  { id: "code", name: "Code Snippet", category: "Other", icon: Code },
  { id: "github", name: "GitHub Contributions", category: "Other", icon: Code },
  { id: "split", name: "Split View", category: "Other", icon: LayoutTemplate },
];

// Group templates by category
const templatesByCategory = frameTemplates.reduce((acc, template) => {
  if (!acc[template.category]) {
    acc[template.category] = [];
  }
  acc[template.category].push(template);
  return acc;
}, {} as Record<string, typeof frameTemplates>);

const Navbar: React.FC = () => {
  const [location] = useLocation();
  const isEditorPage = location === "/editor";
  const [selectedTemplate, setSelectedTemplate] = useState("standard");

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    // This would typically dispatch an action or call a function to update the editor state
    console.log(`Selected template: ${templateId}`);
    
    // For demo purposes only - in reality, this would be handled by a global state manager
    if (window.updateEditorTemplate) {
      window.updateEditorTemplate(templateId);
    }
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Sparkles className="h-6 w-6 text-primary mr-2" />
              <Link href="/">
                <span className="font-bold text-xl cursor-pointer hover:text-primary transition-colors">SupaShot</span>
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link href="/editor">
                <span className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer ${
                  isEditorPage 
                    ? "border-primary" 
                    : "border-transparent hover:border-muted-foreground"
                }`}>
                  Editor
                </span>
              </Link>
              
              {/* Templates Dropdown */}
              {isEditorPage && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <span className="inline-flex items-center px-1 pt-1 border-b-2 border-primary text-sm font-medium cursor-pointer">
                      Templates <ChevronDown className="ml-1 h-4 w-4" />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 max-h-[70vh] overflow-auto">
                    {Object.entries(templatesByCategory).map(([category, templates]) => (
                      <React.Fragment key={category}>
                        <DropdownMenuLabel>{category}</DropdownMenuLabel>
                        {templates.map(template => (
                          <DropdownMenuItem 
                            key={template.id}
                            onClick={() => handleTemplateSelect(template.id)}
                            className={selectedTemplate === template.id ? "bg-muted" : ""}
                          >
                            <template.icon className="mr-2 h-4 w-4 text-primary" />
                            {template.name}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                      </React.Fragment>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              {!isEditorPage && (
                <Link href="/templates">
                  <span className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer ${
                    location === "/templates" 
                      ? "border-primary" 
                      : "border-transparent hover:border-muted-foreground"
                  }`}>
                    Templates
                  </span>
                </Link>
              )}
              
              <Link href="/examples">
                <span className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer ${
                  location === "/examples" 
                    ? "border-primary" 
                    : "border-transparent hover:border-muted-foreground"
                }`}>
                  Examples
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center gap-3">
            {!isEditorPage && (
              <Link href="/editor">
                <Button>
                  Open Editor
                </Button>
              </Link>
            )}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Your Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/editor">Editor</Link>
                </DropdownMenuItem>
                {isEditorPage && (
                  <>
                    <DropdownMenuLabel>Templates</DropdownMenuLabel>
                    {Object.entries(templatesByCategory).map(([category, templates]) => (
                      templates.slice(0, 2).map(template => (
                        <DropdownMenuItem 
                          key={template.id}
                          onClick={() => handleTemplateSelect(template.id)}
                        >
                          {template.name}
                        </DropdownMenuItem>
                      ))
                    ))}
                    <DropdownMenuItem asChild>
                      <Link href="/templates">More Templates...</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {!isEditorPage && (
                  <DropdownMenuItem asChild>
                    <Link href="/templates">Templates</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/examples">Examples</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
