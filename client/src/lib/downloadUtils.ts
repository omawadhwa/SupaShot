import { captureElementAsImage, dataURLtoBlob } from "./imageUtils";
import FileSaver from "file-saver";

/**
 * Download an element as an image
 */
export async function downloadImage(elementId: string, filename: string): Promise<void> {
  try {
    // Capture the element as an image
    const imageData = await captureElementAsImage(elementId);
    
    // Convert to blob and download
    const blob = dataURLtoBlob(imageData);
    FileSaver.saveAs(blob, filename);
    
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
}
