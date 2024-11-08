import { Stylesheet, Rule, Declaration } from '../parser/ast';  

// Function to generate the CSS code from an AST
export function generateCSS(ast: Stylesheet): string {
  let cssOutput = '';

  // Iterate over each rule in the stylesheet
  for (const rule of ast.rules) {
    // Add the selector
    cssOutput += `${rule.selector} {\n`;

    // Add each declaration
    for (const declaration of rule.declarations) {
      cssOutput += `  ${declaration.property}: ${declaration.value};\n`;
    }
    // Close the rule
    cssOutput += `}\n\n`;
  }

  return cssOutput;
}
