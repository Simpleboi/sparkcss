export function generateSpacing(config: any): string {
    // Extract the spacing part of the configuration
    const space = config.spacing;
    let cssOutput = "";
  
    // Generate the Spacing utilities
    if (space && space.gap) {
      for (const [key, size] of Object.entries(space.gap)) {
        cssOutput += `.gap-${key} { gap: ${size};}; \n`;
      }
      cssOutput += "\n";
    }
  
    return cssOutput;
  }
  
  