import { lexer } from "./lexer/lexer";
import { parse } from "./parser/parser";
import { generateCSS } from "./codegen/generator";
import fs from "fs";

// Function to process the Spark file
export function processSparkFile(inputPath: string, outputPath: string) {
  const input = fs.readFileSync(inputPath, "utf-8");
  const tokens = lexer(input);

  // Parse the tokens into an AST
  const ast = parse(tokens);
  
  // Generate CSS from the AST
  const cssOutput = generateCSS(ast);  

  // Write the generated CSS to an output file
  fs.writeFileSync(outputPath, cssOutput);  
}
