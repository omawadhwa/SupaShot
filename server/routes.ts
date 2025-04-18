import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleCaptureWebsite, handleUploadImage } from "./controllers/screenshot";
import multer from "multer";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure multer for file uploads
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];
      
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WebP files are allowed.') as any);
      }
    }
  });

  // API endpoints
  app.post('/api/screenshots/capture', handleCaptureWebsite);
  app.post('/api/screenshots/upload', upload.single('image'), handleUploadImage);

  // Get screenshots by user
  app.get('/api/screenshots/user/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      
      const screenshots = await storage.getScreenshotsByUserId(userId);
      res.json(screenshots);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch screenshots', error: (error as Error).message });
    }
  });

  // Get a single screenshot
  app.get('/api/screenshots/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid screenshot ID' });
      }
      
      const screenshot = await storage.getScreenshot(id);
      if (!screenshot) {
        return res.status(404).json({ message: 'Screenshot not found' });
      }
      
      res.json(screenshot);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch screenshot', error: (error as Error).message });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
