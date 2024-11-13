// parseVariable.ts
// parseVariable.ts
import { TokenType } from "../../lexer/tokens";
import { current, next } from "../../lexer/lexerHelpers/lexerUtils";

// Variable dictionary to store variables and their values
const variableDict: { [key: string]: string } = {};

export function parseVariable(): void {
  // Get the variable token (e.g., $padding)
  const variableToken = current();

  if (variableToken.type !== TokenType.Variable) {
    throw new Error(
      `Expected a Variable, but got ${variableToken.type} at position ${variableToken.position}`
    );
  }

  next(); // Move past the variable token

  // Expect a colon `:` after the variable name
  const colonToken = current();
  if (colonToken.type !== TokenType.Symbol || colonToken.value !== ":") {
    throw new Error(
      `Expected ':' after variable name at position ${colonToken.position}`
    );
  }

  next(); // Move past the colon

  // Get the value token (e.g., 1rem)
  const valueToken = current();
  if (
    valueToken.type !== TokenType.Value &&
    valueToken.type !== TokenType.Color &&
    valueToken.type !== TokenType.Number &&
    valueToken.type !== TokenType.Unit
  ) {
    throw new Error(
      `Expected a value after ':' for the variable at position ${valueToken.position}`
    );
  }

  // Store the variable and its value in the dictionary
  variableDict[variableToken.value] = valueToken.value;

  next(); // Move past the value token

  // Expect a semicolon `;` at the end of the declaration
  const semicolonToken = current();
  if (semicolonToken.type !== TokenType.Symbol || semicolonToken.value !== ";") {
    throw new Error(
      `Expected ';' at the end of variable declaration at position ${semicolonToken.position}`
    );
  }

  next(); // Move past the semicolon
}

export function getVariableValue(variableName: string): string | undefined {
  return variableDict[variableName];
}
