import { TokenType } from "../tokens";
import { addToken, peek, advance, getPosition } from "./lexerUtils";

export function readOperator() {
  const char = advance();

  switch (char) {
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
        throw new Error(`Unexpected operator: ${char} at position ${getPosition()}`);
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
      } else {
        throw new Error(`Unexpected operator: ${char} at position ${getPosition()}`);
      }
      break;
    case "|":
      if (peek() === "|") {
        advance();
        addToken(TokenType.Operator, "||");
      } else {
        throw new Error(`Unexpected operator: ${char} at position ${getPosition()}`);
      }
      break;
    default:
      throw new Error(`Unexpected operator: ${char} at position ${getPosition()}`);
  }
}
