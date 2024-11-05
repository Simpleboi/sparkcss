import { TokenType } from "../tokens";
import { addToken, peek, advance, getPosition, getInput } from "./lexerUtils";

export function readSelector() {
  let selector = "";

  if (peek() === "." || peek() === "#") {
    selector += advance();
  }

  // Use getPosition() instead of directly accessing position
  while (getPosition() < getInput().length && /[a-zA-Z0-9_-]/.test(peek())) {
    selector += advance();
  }

  if (selector.startsWith(".")) {
    addToken(TokenType.Selector, selector); // Class selector (e.g., .class-name)
  } else if (selector.startsWith("#")) {
    addToken(TokenType.Selector, selector); // ID selector (e.g., #id-name)
  } else {
    addToken(TokenType.Selector, selector); // Element/tag selector (e.g., div, span)
  }
}
