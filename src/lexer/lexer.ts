import { Token, TokenType } from "./tokens";
import {
  initializeLexer,
  _tokens,
  peek,
  addToken,
  skipWhitespace,
  getPosition,
  getInput,
  advance,
} from "./lexerHelpers/lexerUtils";
import { readSelector } from "./lexerHelpers/readSelector";
import { readNumber } from "./lexerHelpers/readNumber";
import { readSymbol } from "./lexerHelpers/readSymbol";
import { readOperator } from "./lexerHelpers/readOperator";
import { readDirective } from "./lexerHelpers/readDirective";
import { readVariable } from "./lexerHelpers/readVariables";
import { readValue } from "./lexerHelpers/readValues";
import { readProperty } from "./lexerHelpers/readProperty";

export function lexer(input: string): Token[] {
  initializeLexer(input); // Initialize the lexer with input

  let blockDepth = 0;

  while (getPosition() < getInput().length) {
    skipWhitespace();
    const char = peek();

    if (char === "@") {
      // Read directive (e.g., @snippet, @responsive)
      readDirective();
    } else if (char === "$") {
      // Read variable (e.g., $primary-color)
      readVariable();
    } else if (char === "." || char === "#" || /[a-zA-Z]/.test(char)) {
      if (blockDepth > 0) {
        readProperty();
      } else {
        readSelector();
      }
    } else if (/\d/.test(char)) {
      // Read number (e.g., 10px, 1rem)
      readNumber();
    } else if (char === ":") {
      advance(); 
      addToken(TokenType.Symbol, ":");
      skipWhitespace();
      readValue(); 
    } else if (char === "{") {
      advance(); 
      addToken(TokenType.Symbol, "{");
      blockDepth++;
    } else if (char === "}") {
      advance(); 
      addToken(TokenType.Symbol, "}");
      blockDepth--;
    } else if (";,{}".includes(char)) {
      readSymbol();
    } else if ("+-*/><=!&|".includes(char)) {
      readOperator();
    } else {
      throw new Error(
        `Unexpected character: ${char} at position ${getPosition()}`
      );
    }
  }

  // Add an EOF token at the end of the input
  addToken(TokenType.EOF, "");
  return _tokens;
}
