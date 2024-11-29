export function rgbToHex(rgb:string) {
    // Extract RGB values using a regular expression
    const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) {
      return null; // Invalid RGB value
    }
  
    // Convert to HEX format
    const r = parseInt(match[1]).toString(16).padStart(2, '0');
    const g = parseInt(match[2]).toString(16).padStart(2, '0');
    const b = parseInt(match[3]).toString(16).padStart(2, '0');
  
    return `#${r}${g}${b}`;
  }