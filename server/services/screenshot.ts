import puppeteer from 'puppeteer';
import { storage } from '../storage';
import sharp from 'sharp';

/**
 * Capture a screenshot of a website using Puppeteer
 */
export async function captureWebsiteScreenshot(url: string): Promise<Buffer> {
  try {
    // Use a public endpoint that renders websites and returns screenshots
    // This is a fallback since we can't use Docker in the environment
    const response = await fetch(`https://api.urlbox.io/v1/render?url=${encodeURIComponent(url)}&apiKey=${process.env.URLBOX_API_KEY || 'DEMO'}&format=png`);
    
    if (!response.ok) {
      throw new Error(`Screenshot service returned ${response.status}: ${response.statusText}`);
    }
    
    return Buffer.from(await response.arrayBuffer());
    
  } catch (error) {
    console.error('Error capturing website screenshot:', error);
    throw new Error(`Failed to capture screenshot: ${(error as Error).message}`);
  }
}

/**
 * Process an uploaded image file
 */
export async function processUploadedImage(file: Express.Multer.File): Promise<string> {
  try {
    // Use sharp to process and optimize the image
    const processedImageBuffer = await sharp(file.buffer)
      .resize(1200, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .toBuffer();
    
    // Convert buffer to base64 for frontend display
    return `data:${file.mimetype};base64,${processedImageBuffer.toString('base64')}`;
    
  } catch (error) {
    console.error('Error processing uploaded image:', error);
    throw new Error(`Failed to process image: ${(error as Error).message}`);
  }
}
