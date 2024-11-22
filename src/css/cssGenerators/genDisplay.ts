export function generateDisplay(config: any): string {
  // Grab the display block
  const display = config.display;

  let cssOutput = "";

  //  Generate Flex Direction Utility Classes
  if (display && display.flex.direction) {
    cssOutput += "/* Flex Direction Utility Classes*/\n";
    for (const [key, value] of Object.entries(display.flex.direction)) {
      cssOutput += `.flex-${key} { flex-direction: ${value};} \n`;
    }
    cssOutput += "\n";
  }

  // Generate Flex Justify-content Utility Classes
  if (display && display.flex.justifyContent) {
    cssOutput += "/* Justify-content Utility Classes*/\n";
    for (const [key, value] of Object.entries(display.flex.justifyContent)) {
      cssOutput += `.justify-${key} { justify-content: ${value};} \n`;
    }
    cssOutput += "\n";
  }

  // Generate Flex align-items Utility Classes
  if (display && display.flex.alignItmes) {
    cssOutput += "/* Align Items Utility Classes*/\n";
    for (const [key, value] of Object.entries(display.flex.alignItmes)) {
      cssOutput += `.align-${key} { align-items: ${value};} \n`;
    }
    cssOutput += "\n";
  }

  // Generate Flex Wrap Utility Classes
  if (display && display.flex.flexWrap) {
    cssOutput += "/* Flex Wrap Utility Classes*/\n";
    for (const [key, value] of Object.entries(display.flex.flexWrap)) {
      cssOutput += `.flex-${key} { flex-wrap: ${value};} \n`;
    }
    cssOutput += "\n";
  }

  // Generate Flex Grow Utility Classes
  if (display && display.flex.flexGrow) {
    cssOutput += "/* Flex Flex Grow Utility Classes*/\n";
    for (const [key, value] of Object.entries(display.flex.flexGrow)) {
      cssOutput += `.flex-${key} { flex-grow : ${value};} \n`;
    }
    cssOutput += "\n";
  }

  // Generate Flex Shrink
  if (display && display.flex.flexShrink) {
    cssOutput += "/* Flex Shrink Utility Classes*/\n";
    for (const [key, value] of Object.entries(display.flex.flexShrink)) {
      cssOutput += `.flex-${key} { flex-shrink : ${value};} \n`;
    }
    cssOutput += "\n";
  }

  // Generate the display Flex Property
  if (display && display.flex.flexShrink) {
    cssOutput += "/* Flex Displau Utility Classes*/\n";
    for (const [key, value] of Object.entries(display.flex.display)) {
      cssOutput += `.flex${key} { display : ${value};} \n`;
    }
    cssOutput += "\n";
  }

  // Generate Grid Column Properties
  if (display && display.grid.columns) {
    cssOutput += "/* Grid Column Utility Classes*/\n";
    for (const [key, value] of Object.entries(display.grid.columns)) {
      cssOutput += `.col-${key} { grid-template-columns : ${value};} \n`;
    }
    cssOutput += "\n";
  }

  // Generate Grid Row Properties
  if (display && display.grid.row) {
    cssOutput += "/* Grid Row Utility Classes*/\n";
    for (const [key, value] of Object.entries(display.grid.row)) {
      cssOutput += `.row-${key} { grid-template-rows : ${value};} \n`;
    }
    cssOutput += "\n";
  }

  // Generate Grid Display
  if (display && display.grid.display) {
    cssOutput += "/* Grid Column Utility Classes*/\n";
    for (const [key, value] of Object.entries(display.grid.display)) {
      cssOutput += `.grid { display : ${value};} \n`;
    }
    cssOutput += "\n";
  }

  return cssOutput;
}
