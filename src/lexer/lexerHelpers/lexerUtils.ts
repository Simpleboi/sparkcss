// lexerUtils.ts
import { Token, TokenType } from "../tokens";

let _input = ""; 
let _position = 0; 
let _tokens: Token[] = []; 
let _currentIndex = 0; 

// Initialize the lexer with the input string and reset position and tokens
export function initializeLexer(newInput: string) {
  _input = newInput;
  _position = 0;
  _tokens.length = 0; 
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
  _tokens.push({ type, value, position: _position });
}

// Skip whitespace characters
export function skipWhitespace() {
  while (/\s/.test(peek())) {
    advance();
  }
}


export function initializeParser(inputTokens: Token[]): void {
  _tokens = inputTokens;
  _currentIndex = 0;
}

// Get the current token
export function current(): Token {
  if (_currentIndex < _tokens.length) {
    return _tokens[_currentIndex];
  }
  throw new Error(`Unexpected end of input at index ${_currentIndex}`);
}

// Move to the next token
export function next(): void {
  if (_currentIndex < _tokens.length - 1) {
    _currentIndex++;
  }
}

export function skipEmptyTokens() {
  while (_currentIndex < _tokens.length && current().value === "") {
    next();
  }
}

export function isEndOfTokens(): boolean {
  return _currentIndex >= _tokens.length;
}