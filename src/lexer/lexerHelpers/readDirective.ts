import { TokenType } from "../tokens";
import {
  addToken,
  advance,
  peek,
  getPosition,
  getInput,
  skipWhitespace,
  current,
} from "./lexerUtils";
import { readIdentifier } from "./readIdentifier";
import cssPropertiesData from "mdn-data/css/properties.json"
// @ts-ignore
import { parseCssValue } from 'css-tree';


export function readDirective() {
  // Start by advancing after the '@' symbol
  if (peek() === "@") {
    advance();
    addToken(TokenType.DirectiveStart, "@");
  } else {
    throw new Error(`Expected '@' symbol at position ${getPosition()}`);
  }

  skipWhitespace();

  // Read the keyword part of the directive (e.g., `snippet` or `apply`)
  const keyword = readIdentifier();

  if (keyword === "snippet") {
    addToken(TokenType.DirectiveKeyword, keyword);
    readSnippet();
  } else if (keyword === "apply") {
    addToken(TokenType.DirectiveKeyword, keyword);
    readApply();
  } else {
    throw new Error(
      `Unknown directive keyword '${keyword}' at position ${getPosition()}`
    );
  }
}

// Function to read snippet directive
function readSnippet() {
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

  // Read the body of the snippet until the closing curly brace (`}`)
  while (peek() !== "}" && getPosition() < getInput().length) {
    skipWhitespace();

    const char = peek();

    if (/[a-zA-Z]/.test(char)) {
      const property = readIdentifier();

      const propertyDetails =
        cssPropertiesData[property as keyof typeof cssPropertiesData];
      if (!propertyDetails) {
        throw new Error(
          `Unknown CSS property '${property}' at position ${getPosition()}`
        );
      }

      addToken(TokenType.Property, property);

      skipWhitespace();

      if (peek() === ":") {
        addToken(TokenType.Colon, advance());
      } else {
        throw new Error(
          `Expected ':' after property '${property}' at position ${getPosition()}`
        );
      }

      skipWhitespace();

      let value = "";
      while (/[^\s;]/.test(peek()) && peek() !== undefined) {
        value += advance();
      }

      if (!validateCssValue(property, value)) {
        throw new Error(
          `Invalid value '${value}' for property '${property}' at position ${getPosition()}`
        );
      }

      addToken(TokenType.Value, value);

      skipWhitespace();

      if (peek() === ";") {
        addToken(TokenType.Semicolon, advance());
      } else {
        throw new Error(
          `Expected ';' after value '${value}' at position ${getPosition()}`
        );
      }
    } else {
      throw new Error(
        `Unexpected character in snippet body at position ${getPosition()}`
      );
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

// Function to read apply directive
function readApply() {
  skipWhitespace();

  // Expect and read a colon (`:`)
  if (peek() === ":") {
    advance(); 
    addToken(TokenType.Colon, ":");
  } else {
    throw new Error(
      `Expected ':' after apply keyword at position ${getPosition()}`
    );
  }

  skipWhitespace();

  // Read the snippet name to apply (e.g., `flexBoxCenter`)
  const snippetName = readIdentifier();
  addToken(TokenType.DirectiveName, snippetName);

  skipWhitespace();

  // Expect and read the parentheses `()` if parameters are used
  if (peek() === "(") {
    let parameters = advance(); // Capture '('

    while (peek() !== ")" && getPosition() < getInput().length) {
      parameters += advance();
    }

    // Expect a closing parenthesis `)`
    if (peek() === ")") {
      parameters += advance(); 
      addToken(TokenType.Parameters, parameters);
    } else {
      throw new Error(
        `Expected ')' after snippet name at position ${getPosition()}`
      );
    }
  }

  skipWhitespace();

  // Expect and handle a semicolon (`;`)
  if (peek() === ";") {
    addToken(TokenType.Semicolon, advance());
  } else {
    throw new Error(`Expected ';' at position ${getPosition()}`);
  }
}

function validateCssValue(property: string, value: string): boolean {
  const propertyDetails =
    cssPropertiesData[property as keyof typeof cssPropertiesData];

  if (!propertyDetails) return false;

  const syntax = propertyDetails.syntax;

  try {
    parseCssValue(value, { property, syntax });
    return true;
  } catch (err) {
    return false;
  }
}
