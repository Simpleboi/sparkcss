import { TokenType } from "../tokens";
import { addToken, peek, advance, getInput, getPosition } from "./lexerUtils";

export function readIdentifier() {
  let identifier = "";

  // Capture valid identifier characters until an invalid one is found or end of input
  while (getPosition() < getInput().length && /[a-zA-Z0-9_-]/.test(peek())) {
    identifier += advance();
  }

  // Only add a token if the identifier has a valid length
  if (identifier.length > 0) {
    addToken(TokenType.Identifier, identifier);
  }
}
