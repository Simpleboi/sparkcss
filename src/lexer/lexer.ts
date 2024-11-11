import { Token, TokenType } from "./tokens";
import {
  initializeLexer,
  tokens,
  peek,
  addToken,
  skipWhitespace,
  getPosition,
  getInput,
  advance,
} from "./lexerHelpers/lexerUtils";
import { readIdentifier } from "./lexerHelpers/readIdentifier";
import { readSelector } from "./lexerHelpers/readSelector";
import { readNumber } from "./lexerHelpers/readNumber";
import { readSymbol } from "./lexerHelpers/readSymbol";
import { readOperator } from "./lexerHelpers/readOperator";
import { readDirective } from "./lexerHelpers/readDirective";
import { readVariable } from "./lexerHelpers/readVariables";
import { readValue } from "./lexerHelpers/readValues";

export function lexer(input: string): Token[] {
  initializeLexer(input); // Initialize the lexer with input

  // Main loop: iterate over the input string and build tokens
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
      // Read selector or identifier
      readSelector();
    } else if (/\d/.test(char)) {
      // Read number (e.g., 10px, 1rem)
      readNumber();
    } else if (char === ":") {
      // If a colon is encountered, it indicates the beginning of a value
      advance(); // Move past the colon
      skipWhitespace(); // Skip any whitespace after the colon
      readValue(); // Read the value
    } else if ("{},;".includes(char) || char === "=") {
      // Read symbols (e.g., {, }, ; )
      readSymbol();
    } else if ("+-*/><=!&|".includes(char)) {
      // Read operators (e.g., +, -, *, /, >, <, etc.)
      readOperator();
    } else {
      // Unexpected character, throw an error
      throw new Error(
        `Unexpected character: ${char} at position ${getPosition()}`
      );
    }
  }

  // Add an EOF token at the end of the input
  addToken(TokenType.EOF, "");
  return tokens;
}
