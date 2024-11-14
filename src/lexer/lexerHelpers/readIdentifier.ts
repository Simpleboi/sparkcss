import { advance, peek, getPosition, getInput } from "./lexerUtils";
import { addToken } from "./lexerUtils";
import { TokenType } from "../tokens";

export function readIdentifier(): string {
  let identifier = "";

  // Read characters that are part of the identifier
  while (getPosition() < getInput().length && /[a-zA-Z0-9_-]/.test(peek())) {
    identifier += advance(); 
  }

  return identifier;
}

// Usage to add a token, if required
export function readIdentifierAsToken() {
  const identifier = readIdentifier();
  addToken(TokenType.Identifier, identifier);
}
