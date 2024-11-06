import { TokenType } from "../tokens";
import { addToken, peek, advance, getInput, getPosition } from "./lexerUtils";

export function readDirective() {
  let directive = "";

  // Start with the `@` symbol
  if (peek() === "@") {
    directive += advance();

    // Capture the directive name (alphanumeric characters, underscore, or hyphen)
    while (getPosition() < getInput().length && /[a-zA-Z0-9_-]/.test(peek())) {
      directive += advance();
    }

    // Add the directive token
    addToken(TokenType.Directive, directive);
  } else {
    throw new Error(`Expected '@' for directive at position ${getPosition()}`);
  }
}
