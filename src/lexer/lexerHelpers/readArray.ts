import {
  skipWhitespace,
  addToken,
  advance,
  getPosition,
  peek,
  getInput
} from "./lexerUtils";
import { readIdentifier } from "./readIdentifier";
import { TokenType } from "../tokens";

export function readArray() {
  skipWhitespace();

  // Expect and read a colon (`:`)
  if (peek() === ":") {
    advance(); // Move past ':'
    addToken(TokenType.Colon, ":");
  } else {
    throw new Error(
      `Expected ':' after 'array' keyword at position ${getPosition()}`
    );
  }

  skipWhitespace();

  // Read the array name
  const arrayName = readIdentifier();
  addToken(TokenType.DirectiveName, arrayName);

  skipWhitespace();

  // Expect and read an opening bracket `[`
  if (peek() === "[") {
    addToken(TokenType.BracketStart, advance());
  } else {
    throw new Error(
      `Expected '[' to start array values at position ${getPosition()}`
    );
  }

  // Read array values
  const values: string[] = [];
  let value = "";

  while (peek() !== "]" && getPosition() < getInput().length) {
    const char = peek();

    if (char === ",") {
      values.push(value.trim());
      addToken(TokenType.ArrayValue, value.trim());
      value = "";
      advance(); // Skip the comma
    } else {
      value += advance();
    }
  }

  if (value) {
    values.push(value.trim());
    addToken(TokenType.ArrayValue, value.trim());
  }

  // Expect a closing bracket `]`
  if (peek() === "]") {
    addToken(TokenType.BracketEnd, advance());
  } else {
    throw new Error(
      `Expected ']' to close array values at position ${getPosition()}`
    );
  }

  skipWhitespace();

  // Expect and handle a semicolon (`;`)
  if (peek() === ";") {
    addToken(TokenType.Semicolon, advance());
  } else {
    throw new Error(
      `Expected ';' after array definition at position ${getPosition()}`
    );
  }
}
