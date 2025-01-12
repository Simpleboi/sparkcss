// Lexer tests
import { lexer } from "./lexer";
import { TokenType } from "./tokens";

// Sample Input to test the lexer
const sampleInput = `

@snippet: flexCenter() {
  display: flex;
}

.my-class {
  @apply: flexCenter();
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
