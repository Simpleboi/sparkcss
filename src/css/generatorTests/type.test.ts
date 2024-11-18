import { writeFileSync } from "fs";
import { generateTypography } from "../cssGenerators/genTypography";


let cssOutput = generateTypography();


// Write output to typography.css file
writeFileSync('../outputCSS/typography.css', cssOutput);
console.log('Typography utilities generated successfully!');