// lexerUtils.ts
import { Token, TokenType } from "../tokens";

let _input = ""; // Private input variable
let _position = 0; // Private position variable
export const tokens: Token[] = []; // Array to store all tokens

// Initialize the lexer with the input string and reset position and tokens
export function initializeLexer(newInput: string) {
  _input = newInput;
  _position = 0;
  tokens.length = 0; // Clear existing tokens
}

// Getter for the input string
export function getInput(): string {
  return _input;
}

// Getter and Setter for position
export function getPosition(): number {
  return _position;
}
export function setPosition(newPosition: number) {
  _position = newPosition;
}

// Peek at the current character without advancing the position
export function peek(): string {
  return _input[_position];
}

// Advance the position and return the current character
export function advance(): string {
  return _input[_position++];
}

// Add a token to the tokens array
export function addToken(type: TokenType, value: string) {
  tokens.push({ type, value, position: _position });
}

// Skip whitespace characters
export function skipWhitespace() {
  while (/\s/.test(peek())) {
    advance();
  }
}

