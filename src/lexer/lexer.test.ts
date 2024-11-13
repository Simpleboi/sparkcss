// Lexer tests
import { lexer } from "./lexer";
import { TokenType } from "./tokens";

// Sample Input to test the lexer
const sampleInput = `
$padding: 1rem;

.my-class {
  padding: $padding;
}
`;

const tokens = lexer(sampleInput);

tokens.forEach((token) => {
  console.log({
    type: TokenType[token.type],
    value: token.value,
    position: token.position,
  });
});
