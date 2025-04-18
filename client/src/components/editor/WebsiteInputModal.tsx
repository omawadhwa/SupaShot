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
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Capture Website Screenshot</DialogTitle>
        <DialogDescription>
          Enter a website URL to capture a screenshot
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="url">Website URL</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            The website will be captured as it appears on desktop devices
          </p>
        </div>
        
        <DialogFooter>
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
            className="bg-[#10b981] hover:bg-[#0d9669] text-white"
            disabled={isLoading}
          >
            {isLoading ? "Capturing..." : "Capture Screenshot"}
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default WebsiteInputModal;
