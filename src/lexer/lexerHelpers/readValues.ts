import { TokenType } from "../tokens";
import { addToken, peek, advance, getPosition, getInput } from "./lexerUtils";


export function readValue() {
  let value = "";
  const char = peek();


  // Handle Colors (Hex Codes) or Color Keywords
  if (char === "#") {
    value += advance(); // Capture the '#'

    // Read the next 3 or 6 hexadecimal characters
    while (/[0-9a-fA-F]/.test(peek()) && value.length < 7) {
      value += advance();
    }

    // Validate that we have a correct color length (#RGB or #RRGGBB format)
    if (value.length === 4 || value.length === 7) {
      addToken(TokenType.Color, value);
    } else {
      throw new Error(`Invalid color format: ${value} at position ${getPosition()}`);
    }
    return;
  }

  // Handle Numbers with Units (e.g., '10px', '1.5rem')
  if (/\d/.test(char)) {
    // Read the number
    while (/[0-9.]/.test(peek())) {
      value += advance();
    }

    // Check for units after the number (e.g., px, rem, %, etc.)
    let unit = "";
    while (/[a-zA-Z%]/.test(peek())) {
      unit += advance();
    }

    if (unit) {
      addToken(TokenType.Unit, value + unit);
    } else {
      addToken(TokenType.Number, value);
    }
    return;
  }

  // Handle Variables as Values (e.g., $primary-color)
  if (char === "$") {
    value += advance(); // Capture the '$'

    while (/[a-zA-Z0-9_-]/.test(peek())) {
      value += advance();
    }

    addToken(TokenType.Variable, value);
    return;
  }

  // Handle Generic CSS Keywords and Property Values (e.g., 'red', 'block', 'none')
  if (/[a-zA-Z]/.test(char)) {
    while (getPosition() < getInput().length && /[a-zA-Z0-9_-]/.test(peek())) {
      value += advance();
    }

    addToken(TokenType.Value, value);
    return;
  }

  // If none of the conditions are met, throw an error with more information
  throw new Error(
    `Unexpected value at position ${getPosition()}. Current value: '${value}', Current char: '${char}'`
  );
}

