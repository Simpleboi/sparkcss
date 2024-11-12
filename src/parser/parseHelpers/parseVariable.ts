// parseVariable.ts
import { TokenType, Token } from "../../lexer/tokens";
import { current, next } from "../../lexer/lexerHelpers/lexerUtils";

const variableDict: { [key: string]: string } = {};

export function parseVariable(): void {
  const variableToken = current();
  if (variableToken.type !== TokenType.Variable) {
    throw new Error(`Expected a Variable, but got ${variableToken.type}`);
  }
  next();

  if (current().type !== TokenType.Symbol || current().value !== ":") {
    throw new Error(`Expected ':' after variable name`);
  }
  next();

  const valueToken = current();
  if (
    valueToken.type !== TokenType.Value &&
    valueToken.type !== TokenType.Color &&
    valueToken.type !== TokenType.Number
  ) {
    throw new Error(`Expected a value after ':' for the variable`);
  }
  next();

  variableDict[variableToken.value] = valueToken.value;

  if (current().type !== TokenType.Symbol || current().value !== ";") {
    throw new Error(`Expected ';' at the end of variable declaration`);
  }
  next();
}
