export function generateColors(config: any): string {
    // Extract the spacing part of the configuration
    const color = config.colors;
    let cssOutput = "";
  
    // Generate the Foreground utilities
    if (color && color.text) {
      for (const [key, value] of Object.entries(color.text)) {
        cssOutput += `.txt-${key} { color: ${value};}\n`;
      }
      cssOutput += "\n";
    }

    // Generate the Background utilities
    if (color && color.background) {
        for (const [key, value] of Object.entries(color.background)) {
          cssOutput += `.bg-${key} { background-color: ${value};}\n`;
        }
        cssOutput += "\n";
      }
  
    return cssOutput;
  }
  
  