import { Token, TokenType } from "./tokens";
import {
  initializeLexer,
  tokens,
  peek,
  addToken,
  skipWhitespace,
  getPosition,
  getInput,
} from "./lexerHelpers/lexerUtils";
import { readIdentifier } from "./lexerHelpers/readIdentifier";
import { readSelector } from "./lexerHelpers/readSelector";
import { readNumber } from "./lexerHelpers/readNumber";
import { readSymbol } from "./lexerHelpers/readSymbol";
import { readOperator } from "./lexerHelpers/readOperator";
import { readDirective } from "./lexerHelpers/readDirective";

export function lexer(input: string): Token[] {
  initializeLexer(input); // Initialize the lexer with input

  // Main loop: iterate over the input string and build tokens
  while (getPosition() < getInput().length) {
    skipWhitespace();
    const char = peek();

    if (char === "@") {
      readDirective(); 
    } 
    else if (char === "." || char === "#" || /[a-zA-Z]/.test(char)) {
      if (char === "." || char === "#") {
        readSelector();
      } else {
        readIdentifier();
      }
    } 
    else if (/\d/.test(char)) {
      readNumber();
    } 
    else if ("{},;:".includes(char) || char === "=") {
      readSymbol();
    } 
    else if ("+-*/><=!&|".includes(char)) {
      readOperator();
    } 
    else {
      throw new Error(
        `Unexpected character: ${char} at position ${getPosition()}`
      );
    }
  }

  // Add an EOF token at the end of the input
  addToken(TokenType.EOF, "");
  return tokens;
}
