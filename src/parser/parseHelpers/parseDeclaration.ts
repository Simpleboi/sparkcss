// parseDeclaration.ts
import { TokenType, Token } from "../../lexer/tokens";
import { Declaration } from "../ast";
import { cssPropertyValues } from "../../css/cssPropertiesMappings";
import { cssProperties } from "../../css/cssProperties";
import { current, next } from "../../lexer/lexerHelpers/lexerUtils";

export function parseDeclaration(): Declaration {
  const propertyToken = current();

  if (
    propertyToken.type !== TokenType.Property &&
    propertyToken.type !== TokenType.Identifier
  ) {
    throw new Error(
      `Expected Property, but got ${propertyToken.type} at position ${propertyToken.position}`
    );
  }

  const propertyName = propertyToken.value;
  if (!cssProperties.includes(propertyName)) {
    throw new Error(
      `Unknown property '${propertyName}' at position ${propertyToken.position}`
    );
  }

  next();

  if (current().type !== TokenType.Symbol || current().value !== ":") {
    throw new Error(
      `Expected ':' after property name at position ${current().position}`
    );
  }
  next();

  const valueToken = current();
  const validValues = cssPropertyValues[propertyName] || [];

  if (
    !validValues.includes(valueToken.value) &&
    valueToken.type !== TokenType.Unit &&
    valueToken.type !== TokenType.Number
  ) {
    throw new Error(
      `Invalid value '${valueToken.value}' for property '${propertyName}' at position ${valueToken.position}`
    );
  }

  next();

  if (current().type !== TokenType.Symbol || current().value !== ";") {
    throw new Error(
      `Expected ';' at the end of declaration at position ${current().position}`
    );
  }
  next();

  return {
    type: "Declaration",
    property: propertyName,
    value: valueToken.value,
  };
}
