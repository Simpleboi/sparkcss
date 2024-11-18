
export function generateTypography(config: any): string {
  // Extract the typography part of the configuration
  const type = config.typography;
  let cssOutput = "";

  // Generate the fontSizes utilities
  if (type && type.fontSizes) {
    for (const [key, size] of Object.entries(type.fontSizes)) {
      cssOutput += `.txt-${key} { font-size: ${size};}; \n`;
    }
    cssOutput += "\n";
  }

  // Generate the fontWeight utilities
  if (type && type.fontWeight) {
    for (const [key, weight] of Object.entries(type.fontWeight)) {
      cssOutput += `.weight-${key} { font-size: ${weight};}; \n`;
    }
    cssOutput += "\n";
  }

  return cssOutput;
}

