import { utilityClasses } from './utilitiesConfig';  
import * as fs from 'fs';

function generateAllUtilityClasses(): string {
  let outputCSS = "";

  Object.keys(utilityClasses).forEach((cls) => {
    const utility = utilityClasses[cls];
    outputCSS += `.${cls} { ${utility.property}: ${utility.value}; }\n`;
  });

  return outputCSS;
}

// Generate all utility classes and write them to a CSS file
const generatedCSS = generateAllUtilityClasses();
fs.writeFileSync('sparkcss-utilities.css', generatedCSS);
console.log('Generated full utility CSS file: sparkcss-utilities.css');
