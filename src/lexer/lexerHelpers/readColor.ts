import { TokenType } from "../tokens";
import { addToken, peek, advance, getPosition } from "./lexerUtils";

export function readColor() {
  let color = advance(); // Start with the '#' symbol

  // Continue reading hexadecimal characters for color
  while (/[0-9a-fA-F]/.test(peek()) && color.length < 7) {
    color += advance();
  }

  // Validate the color length: it should be either #RGB or #RRGGBB
  if (color.length === 4 || color.length === 7) {
    addToken(TokenType.Color, color);
  } else {
    throw new Error(`Invalid color format: ${color} at position ${getPosition()}`);
  }
}
