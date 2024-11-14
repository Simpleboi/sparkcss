import { TokenType } from "../tokens";
import { addToken, advance, getPosition } from "./lexerUtils";

export function readSymbol() {
  const char = advance();

  switch (char) {
    case "{":
      addToken(TokenType.CurlyStart, char);
      break;
    case "}":
      addToken(TokenType.CurlyEnd, char);
      break;
    case ";":
      addToken(TokenType.Semicolon, char);
      break;
    case ",":
      addToken(TokenType.Comma, char);
      break;
    case ":":
      addToken(TokenType.Colon, char);
      break;
    case "=":
      addToken(TokenType.Symbol, char); 
      break;
    default:
      throw new Error(`Unexpected symbol: ${char} at position ${getPosition()}`);
  }
}
