import { Request, Response } from 'express';
import { captureWebsiteScreenshot, processUploadedImage } from '../services/screenshot';

/**
 * Handle website screenshot capture requests
 */
export async function handleCaptureWebsite(req: Request, res: Response) {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid URL format' });
    }
    
    // Capture screenshot
    const imageBuffer = await captureWebsiteScreenshot(url);
    
    // Return the captured image as base64
    const base64Image = imageBuffer.toString('base64');
    res.json({
      success: true,
      imageData: `data:image/png;base64,${base64Image}`
    });
    
  } catch (error) {
    console.error('Error capturing website screenshot:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to capture website screenshot',
      error: (error as Error).message
    });
  }
}

/**
 * Handle image uploads
 */
export async function handleUploadImage(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Process the uploaded image
    const imageData = await processUploadedImage(req.file);
    
    res.json({
      success: true,
      imageData
    });
    
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process uploaded image',
      error: (error as Error).message
    });
  }
}
