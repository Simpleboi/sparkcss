
export function generateTypography(config: any): string {
  // Extract the typography part of the configuration
  const type = config.typography;
  let cssOutput = "";

  // Generate the fontSizes utilities
  if (type && type.fontSizes) {
    cssOutput += "/* Font Size Utility Classes*/\n"
    for (const [key, size] of Object.entries(type.fontSizes)) {
      cssOutput += `.font-${key} { font-size: ${size};}; \n`;
    }
    cssOutput += "\n";
  }

  // Generate the fontWeight utilities
  if (type && type.fontWeight) {
    cssOutput += "/* Font Weight Utility Classes*/\n"
    for (const [key, weight] of Object.entries(type.fontWeight)) {
      cssOutput += `.weight-${key} { font-weight: ${weight};}; \n`;
    }
    cssOutput += "\n";
  }

  // Generate the line-height utilities
  if (type && type.lineHeight) {
    cssOutput += "/* Line Height Utility Classes*/\n"
    for (const [key, height] of Object.entries(type.lineHeight)) {
      cssOutput += `.line-${key} { line-height: ${height};}; \n`;
    }
    cssOutput += "\n";
  }

  // Generate the letter-spacing utilities
  if (type && type.letterSpacing) {
    cssOutput += "/* Letter Spacing Utility Classes*/\n"
    for (const [key, spacing] of Object.entries(type.letterSpacing)) {
      cssOutput += `.letter-${key} { letter-spacing: ${spacing};}; \n`;
    }
    cssOutput += "\n";
  }


  // Generate the text Allign utilities
  if (type && type.textAlign) {
    cssOutput += "/* Text Align Utility Classes*/\n"
    for (const [key, alignment] of Object.entries(type.textAlign)) {
      cssOutput += `.text-${key} { text-align: ${alignment};}; \n`;
    }
    cssOutput += "\n";
  }
  

  return cssOutput;
}

