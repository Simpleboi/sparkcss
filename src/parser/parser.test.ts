// Parser tests
import { lexer } from "../lexer/lexer";
import { parse } from "./parser";
import { TokenType } from "../lexer/tokens";

const sampleInput = `

$example: 10px;

.second-class {
  padding: $example;
};

`;

// Tokenize the input
const tokens = lexer(sampleInput);
tokens.forEach((token) => {
  console.log({
    type: TokenType[token.type],
    value: token.value,
    position: token.position,
  });
});

console.log("\n");


// Parse the tokens into an AST
const ast = parse(tokens);
console.log("Generated AST:", JSON.stringify(ast, null, 2));
