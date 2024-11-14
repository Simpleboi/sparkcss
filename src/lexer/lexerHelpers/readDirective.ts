import { TokenType } from "../tokens";
import { addToken, peek, advance, getInput, getPosition } from "./lexerUtils";

export function readDirective() {
  let directive = "";

  // Capture the initial '@'
  if (peek() === "@") {
    directive += advance(); // Move past '@'

    // Read characters after the '@' (e.g., snippet, apply)
    while (getPosition() < getInput().length && /[a-zA-Z]/.test(peek())) {
      directive += advance();
    }

    if (directive === "@snippet") {
      addToken(TokenType.Snippet, directive);
    } else if (directive === "@apply") {
      addToken(TokenType.Apply, directive);
    } else {
      throw new Error(`Unknown directive: ${directive} at position ${getPosition()}`);
    }
  }
}