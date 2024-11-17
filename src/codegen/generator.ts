import { Stylesheet, Rule, Snippet, Declaration } from '../parser/ast';

// Function to generate the CSS code from an AST
export function generateCSS(ast: Stylesheet): string {
  let cssOutput = '';

  // Maintain a map of snippets for quick lookup
  const snippetMap: { [name: string]: Declaration[] } = {};

  // Register all snippets in the map
  for (const snippet of ast.snippets) {
    snippetMap[snippet.name] = snippet.declarations;
  }

  // Iterate over each rule in the stylesheet
  for (const rule of ast.rules) {
    cssOutput += generateRuleCSS(rule, snippetMap);
  }

  return cssOutput;
}

// Function to generate CSS for a given rule
function generateRuleCSS(rule: Rule, snippetMap: { [name: string]: Declaration[] }): string {
  let ruleOutput = `${rule.selector} {\n`;

  // Iterate over each declaration in the rule
  for (const declaration of rule.declarations) {
    if (declaration.property === "@apply") {
      // Handle @apply directive: look up the snippet and add its declarations
      const snippetName = declaration.value;
      if (snippetMap[snippetName]) {
        for (const snippetDeclaration of snippetMap[snippetName]) {
          ruleOutput += `  ${snippetDeclaration.property}: ${snippetDeclaration.value};\n`;
        }
      } else {
        throw new Error(`Snippet '${snippetName}' not found for @apply directive.`);
      }
    } else {
      // Standard CSS property
      ruleOutput += `  ${declaration.property}: ${declaration.value};\n`;
    }
  }

  // Close the rule
  ruleOutput += `}\n\n`;

  return ruleOutput;
}

