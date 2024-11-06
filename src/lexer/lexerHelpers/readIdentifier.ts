import { TokenType } from "../tokens"; 
import { addToken, peek, advance, getInput, getPosition } from "./lexerUtils";

export function readIdentifier() {
  let identifier = "";

  // Start with alphabetic characters (or `$` for variables)
  while (getPosition() < getInput().length && /[a-zA-Z0-9_-]/.test(peek())) {
    identifier += advance();
  }

  // Check if the identifier is a variable (starts with `$`)
  if (identifier.startsWith("$")) {
    addToken(TokenType.Variable, identifier);
  } else {
    addToken(TokenType.Identifier, identifier);
  }
}