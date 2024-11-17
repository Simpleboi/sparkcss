import * as fs from 'fs';
import { lexer } from '../src/lexer/lexer';
import { parse } from '../src/parser/parser';
import { generateCSS } from '../src/codegen/generator';

// File path to the .spark file
const filePath = './test.spark';

// Read the content of the .spark file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return;
  }

  try {
    // Tokenize the content
    const tokens = lexer(data);
    console.log('Tokens:', tokens);

    // Parse the tokens into an AST
    const ast = parse(tokens);
    console.log('AST:', JSON.stringify(ast, null, 2));

    // Generate CSS from the AST
    const cssOutput = generateCSS(ast);
    console.log('Generated CSS:\n', cssOutput);

    // Write the generated CSS to a .css file
    const outputFilePath = './output.css';
    fs.writeFile(outputFilePath, cssOutput, (writeErr) => {
      if (writeErr) {
        console.error(`Error writing to file ${outputFilePath}:`, writeErr);
      } else {
        console.log(`CSS written to ${outputFilePath}`);
      }
    });
  } catch (e) {
    console.error('Error processing SparkCSS file:', e);
  }
});
