import { Token, TokenType } from "./tokens";
import { initializeLexer, tokens, peek, advance, addToken, skipWhitespace, getPosition, getInput } from "./lexerHelpers/lexerUtils";
import { readIdentifier } from "./lexerHelpers/readIdentifier";
import { readSelector } from "./lexerHelpers/readSelector";
import { readNumber } from "./lexerHelpers/readNumber";
import { readSymbol } from "./lexerHelpers/readSymbol"; 
import { readOperator } from "./lexerHelpers/readOperator"; 

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
    } else if ("{};:".includes(char) || char === "=") {
      readSymbol(); 
    } else if ("+-*/><=!&|".includes(char)) {
      readOperator(); 
    } else {
      throw new Error(`Unexpected character: ${char} at position ${getPosition()}`);
    }
  }

  // Add an EOF token at the end of the input
  addToken(TokenType.EOF, "");
  return tokens;
}

