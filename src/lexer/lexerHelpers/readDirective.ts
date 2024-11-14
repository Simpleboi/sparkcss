// readDirective.ts
import { TokenType } from "../tokens";
import {
  addToken,
  advance,
  peek,
  getPosition,
  getInput,
  skipWhitespace,
} from "./lexerUtils";
import { readIdentifier } from "./readIdentifier";

export function readDirective() {

  // Start by advancing after the '@' symbol
  if (peek() === '@') {
    advance(); 
    addToken(TokenType.DirectiveStart, '@');
  } else {
    throw new Error(`Expected '@' symbol at position ${getPosition()}`);
  }

  skipWhitespace();

  // Read the keyword part of the directive (e.g., `snippet`)
  const keyword = readIdentifier();
  addToken(TokenType.DirectiveKeyword, keyword);

  skipWhitespace();

  // Expect and read a colon (`:`)
  if (peek() === ":") {
    advance(); // Move past ':'
  } else {
    throw new Error(
      `Expected ':' after directive keyword at position ${getPosition()}`
    );
  }

  // Skip white space after the colon
  skipWhitespace();

  // Read the snippet name (e.g., `flexBox`)
  const snippetName = readIdentifier();
  addToken(TokenType.DirectiveName, snippetName);

  // Skip any whitespace after the snippet name
  skipWhitespace();

  // Check if we have parameters (`()`)
  if (peek() === "(") {
    let parameters = advance(); 

    // Read the parameters until closing `)`
    while (peek() !== ")" && getPosition() < getInput().length) {
      parameters += advance();
    }

    // Expect a closing parenthesis `)`
    if (peek() === ")") {
      parameters += advance(); // Capture ')'
    } else {
      throw new Error(
        `Expected ')' after parameters at position ${getPosition()}`
      );
    }

    // Add the parameters token
    addToken(TokenType.Parameters, parameters);
  }

  // Skip any whitespace after the parameters
  skipWhitespace();

  // Expect an opening curly brace (`{`)
  if (peek() === "{") {
    addToken(TokenType.CurlyStart, advance());
  } else {
    throw new Error(`Expected '{' at position ${getPosition()}`);
  }

  skipWhitespace();

  // Read the body of the directive until the closing curly brace (`}`)
  while (peek() !== "}" && getPosition() < getInput().length) {
    skipWhitespace(); 

    const char = peek();

    if (/[a-zA-Z]/.test(char)) {
      // This could be either a property name or a value
      const identifier = readIdentifier();
      addToken(TokenType.Property, identifier);
    } else if (/\d/.test(char)) {
      // Handle numbers and units like '10px'
      let value = "";

      // Capture the numeric part
      while (/\d/.test(peek()) || peek() === ".") {
        value += advance();
      }

      // Capture the unit part, if present (e.g., 'px', 'rem')
      while (/[a-zA-Z]/.test(peek())) {
        value += advance();
      }

      addToken(TokenType.Unit, value);
    } else if (char === ":") {
      addToken(TokenType.Colon, advance());
    } else if (char === ";") {
      addToken(TokenType.Semicolon, advance());
    } else {
      throw new Error(`Unexpected character in directive body at position ${getPosition()}`);
    }
    skipWhitespace();
  }

  skipWhitespace();


  // Expect a closing curly brace (`}`)
  if (peek() === "}") {
    addToken(TokenType.CurlyEnd, advance()); 
  } else {
    throw new Error(`Expected '}' at position ${getPosition()}`);
  }

  skipWhitespace();


  // Expect and handle a semicolon (`;`)
  if (peek() === ";") {
    addToken(TokenType.Semicolon, advance()); 
  }
}
