// Lexer tests
import { lexer } from "./lexer";
import { TokenType } from "./tokens";

// Sample Input to test the lexer
const sampleInput = `

@snippet: flexBoxCenter() {
  padding: 10px;
  margin: 20px;
};

.my-class {
  padding: 10px;
  @apply: flexBoxCenter();
};

`;

const tokens = lexer(sampleInput);

tokens.forEach((token) => {
  console.log({
    type: TokenType[token.type],
    value: token.value,
    position: token.position,
  });
});
