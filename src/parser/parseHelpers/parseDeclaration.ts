// parseDeclaration.ts
import { TokenType } from "../../lexer/tokens";
import { Declaration } from "../ast";
import { current, next } from "../../lexer/lexerHelpers/lexerUtils";
import { getVariableValue } from "./parseVariable";
import cssPropertiesData from "mdn-data/css/properties.json"; 

export function parseDeclaration(): Declaration {
  console.log("Starting parseDeclaration at position", current().position);

  const propertyToken = current();

  // Validate that the token is a property type
  if (propertyToken.type !== TokenType.Property) {
    throw new Error(
      `Expected Property, but got ${propertyToken.type} at position ${propertyToken.position}`
    );
  }

  const propertyName = propertyToken.value;

  // Check if the property is a valid CSS property using mdn-data
  const propertyDetails =
    cssPropertiesData[propertyName as keyof typeof cssPropertiesData];

  if (!propertyDetails) {
    throw new Error(
      `Unknown CSS property '${propertyName}' at position ${propertyToken.position}`
    );
  }

  next();

  // Expect and validate the colon `:`
  if (current().type !== TokenType.Symbol || current().value !== ":") {
    throw new Error(
      `Expected ':' after property name at position ${current().position}`
    );
  }
  next();

  // Parse the value
  const valueToken = current();
  let value = valueToken.value;

  if (valueToken.type === TokenType.Variable) {
    // If the value is a variable, look it up in the dictionary
    const variableValue = getVariableValue(value);
    if (!variableValue) {
      throw new Error(
        `Undefined variable '${value}' at position ${valueToken.position}`
      );
    }
    value = variableValue; // Replace the variable with its actual value
  } else if (
    valueToken.type !== TokenType.Unit &&
    valueToken.type !== TokenType.Number &&
    valueToken.type !== TokenType.Color &&
    valueToken.type !== TokenType.Value
  ) {
    throw new Error(
      `Invalid value '${value}' for property '${propertyName}' at position ${valueToken.position}`
    );
  }

  next(); 

  // Expect and validate the semicolon `;`
  if (current().type !== TokenType.Symbol || current().value !== ";") {
    throw new Error(
      `Expected ';' at the end of declaration at position ${current().position}`
    );
  }
  next(); 

  console.log(`Successfully parsed declaration for property '${propertyName}'`);

  return {
    type: "Declaration",
    property: propertyName,
    value: value,
  };
}