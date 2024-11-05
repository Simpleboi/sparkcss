import { Token, TokenType } from "./tokens";
import { initializeLexer, tokens, peek, advance, addToken, skipWhitespace, getPosition, getInput } from "./lexerHelpers/lexerUtils";
import { readIdentifier } from "./lexerHelpers/readIdentifier";
import { readSelector } from "./lexerHelpers/readSelector";
import { readNumber } from "./lexerHelpers/readNumber";
import { readSymbolOrOperator } from "./lexerHelpers/readSymbolOrOperator";

export function lexer(input: string): Token[] {
  initializeLexer(input); // Initialize the lexer with input

  // Main loop: iterate over the input string and build tokens
  while (getPosition() < getInput().length) {
    skipWhitespace();
    const char = peek();

    if (char === "." || char === "#" || /[a-zA-Z]/.test(char)) {
      readSelector();
    } else if (/[a-zA-Z_$@]/.test(char)) {
      readIdentifier();
    } else if (/\d/.test(char)) {
      readNumber();
    } else {
      readSymbolOrOperator();
    }
  }

  // Add an EOF token at the end of the input
  addToken(TokenType.EOF, "");
  return tokens;
}
