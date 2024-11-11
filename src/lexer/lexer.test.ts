// Lexer tests
import { lexer } from "./lexer";
import { TokenType } from "./tokens";

// Sample Input to test the lexer
const sampleInput = `
$primary-color: red;

.my-class {
  color: $primary-color;
  padding: 10px;
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
