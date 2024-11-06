import { TokenType } from "../tokens";
import { addToken, advance, getPosition } from "./lexerUtils";

export function readSymbol() {
  const char = advance();

  switch (char) {
    case "{":
    case "}":
    case ";":
    case ",":
    case ":":
      addToken(TokenType.Symbol, char);
      break;
    case "=":
      addToken(TokenType.Symbol, char);
      break;
    default:
      throw new Error(`Unexpected symbol: ${char} at position ${getPosition()}`);
  }
}
