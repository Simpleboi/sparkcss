import { TokenType } from "../tokens";
import { addToken, peek, advance, getPosition } from "./lexerUtils";
import { readColor } from "./readColor"; // Import readColor if it's used within

export function readSymbolOrOperator() {
  const char = advance();

  switch (char) {
    case "{":
    case "}":
    case ";":
    case ":":
      addToken(TokenType.Symbol, char);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
    case ">":
    case "<":
      addToken(TokenType.Operator, char);
      break;
    case "=":
      if (peek() === "=") {
        advance();
        addToken(TokenType.Operator, "==");
      } else {
        addToken(TokenType.Symbol, "=");
      }
      break;
    case "!":
      if (peek() === "=") {
        advance();
        addToken(TokenType.Operator, "!=");
      } else {
        addToken(TokenType.Operator, "!");
      }
      break;
    case "&":
      if (peek() === "&") {
        advance();
        addToken(TokenType.Operator, "&&");
      }
      break;
    case "|":
      if (peek() === "|") {
        advance();
        addToken(TokenType.Operator, "||");
      }
      break;
    case "#":
      readColor();
      break;
    default:
      throw new Error(`Unexpected character: ${char} at position ${getPosition()}`);
  }
}
