import { TokenType } from "../tokens";
import { addToken, peek, advance, getPosition, getInput } from "./lexerUtils";

export function readSelector() {
  let selector = "";

  // Start reading if the first character is "." or "#"
  if (peek() === "." || peek() === "#") {
    selector += advance();
  }

  // Continue reading characters that match valid selector naming conventions
  while (getPosition() < getInput().length && /[a-zA-Z0-9_-]/.test(peek())) {
    selector += advance();
  }

  // Only add the token if the selector is non-empty
  if (selector.length > 0) {
    if (selector.startsWith(".")) {
      addToken(TokenType.Selector, selector); // Class selector (e.g., .class-name)
    } else if (selector.startsWith("#")) {
      addToken(TokenType.Selector, selector); // ID selector (e.g., #id-name)
    } else {
      addToken(TokenType.Selector, selector); // Element/tag selector (e.g., div, span)
    }
  }
}
