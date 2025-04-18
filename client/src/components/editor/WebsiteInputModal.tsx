import React, { useState } from "react";
import { 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertCircle, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ArrowRight, 
  Sparkles 
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface WebsiteInputModalProps {
  onCapture: (url: string) => void;
  onCancel: () => void;
}

const WebsiteInputModal: React.FC<WebsiteInputModalProps> = ({ 
  onCapture, 
  onCancel 
}) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deviceType, setDeviceType] = useState("desktop");
  const [fullPage, setFullPage] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate URL
    if (!url) {
      setError("Please enter a URL");
      return;
    }
    
    try {
      // Add protocol if missing
      let processedUrl = url;
      if (!/^https?:\/\//i.test(url)) {
        processedUrl = "https://" + url;
      }
      
      // Simple URL validation
      new URL(processedUrl);
      
      setIsLoading(true);
      setError("");
      onCapture(processedUrl);
    } catch (err) {
      setError("Please enter a valid URL");
    }
  };

  // Popular website options
  const popularWebsites = [
    { name: "Google", url: "https://www.google.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "GitHub", url: "https://github.com" },
    { name: "Stack Overflow", url: "https://stackoverflow.com" },
    { name: "Product Hunt", url: "https://www.producthunt.com" }
  ];

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <span>Capture Website Screenshot</span>
        </DialogTitle>
        <DialogDescription>
          Enter a website URL to create a beautiful screenshot
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-5 py-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div>
          <Label htmlFor="url" className="text-base font-medium mb-2 block">Website URL</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Globe className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm mb-1.5 block">Device Type</Label>
            <Select defaultValue="desktop" onValueChange={setDeviceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desktop" className="flex items-center">
                  <Monitor className="h-4 w-4 mr-2" />
                  <span>Desktop</span>
                </SelectItem>
                <SelectItem value="mobile">
                  <div className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-2" />
                    <span>Mobile</span>
                  </div>
                </SelectItem>
                <SelectItem value="tablet">
                  <div className="flex items-center">
                    <Tablet className="h-4 w-4 mr-2" />
                    <span>Tablet</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm mb-1.5 block">Options</Label>
            <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
              <span className="text-sm">Full Page</span>
              <Switch 
                checked={fullPage}
                onCheckedChange={setFullPage}
              />
            </div>
          </div>
        </div>
        
        <div>
          <Label className="text-sm mb-1.5 block">Popular Websites</Label>
          <div className="flex flex-wrap gap-2">
            {popularWebsites.map(website => (
              <Badge 
                key={website.name}
                variant="outline" 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setUrl(website.url)}
              >
                {website.name}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 -mx-6 px-6 py-4 mt-6 space-y-3">
          <div className="flex items-center text-sm">
            <Sparkles className="h-4 w-4 text-[#10b981] mr-2" />
            <span className="font-medium">Pro Tip:</span>
            <span className="text-gray-500 ml-2">The screenshot will be instantly available to edit</span>
          </div>
          
          <DialogFooter className="pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-[#10b981] hover:bg-[#0d9669] text-white gap-1"
              disabled={isLoading}
            >
              {isLoading ? (
                "Capturing..."
              ) : (
                <>
                  <span>Capture Screenshot</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </div>
  );
};

export default WebsiteInputModal;
