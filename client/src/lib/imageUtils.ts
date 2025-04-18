import { Shadow } from "@/types";
import html2canvas from "html2canvas";

/**
 * Generate CSS shadow style from Shadow object
 */
export function generateEditorShadow(shadow: Shadow): string {
  if (!shadow.enabled) return "none";
  
  const { x, y, blur, spread } = shadow.position;
  const color = shadow.color;
  const opacity = shadow.intensity.toFixed(2);
  
  // Create the shadow with opacity
  const shadowColor = `rgba(0, 0, 0, ${opacity})`;
  
  return `${x}px ${y}px ${blur}px ${spread}px ${shadowColor}`;
}

/**
 * Capture element as image
 */
export async function captureElementAsImage(elementId: string): Promise<string> {
  const element = document.getElementById(elementId);
  
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }
  
  const canvas = await html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    scale: 2, // Higher resolution
  });
  
  return canvas.toDataURL("image/png");
}

/**
 * Convert data URL to a Blob
 */
export function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
}
