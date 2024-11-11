// Parser tests
import { lexer } from "../lexer/lexer";
import { parse } from "./parser";

const sampleInput = `
$primary-color: red;

.my-class {
  color: $primary-color;
  padding: 1rem;
}
`;

// Tokenize the input
const tokens = lexer(sampleInput);
console.log(tokens);

// Parse the tokens into an AST
const ast = parse(tokens);
console.log("Generated AST:", JSON.stringify(ast, null, 2));
