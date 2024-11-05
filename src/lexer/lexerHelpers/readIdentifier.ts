import { TokenType } from "../tokens"; 
import { addToken, peek, advance, getInput, getPosition } from "./lexerUtils";

export function readIdentifier() {
  let identifier = "";

  if (peek() === "@") {
    identifier += advance();

    while (getPosition() < getInput().length && /[a-zA-Z0-9_-]/.test(peek())) {
      identifier += advance();
    }

    addToken(TokenType.Variable, identifier);
  } else {
    while (getPosition() < getInput().length && /[a-zA-Z0-9_-]/.test(peek())) {
      identifier += advance();
    }

    addToken(TokenType.Identifier, identifier);
  }
}
