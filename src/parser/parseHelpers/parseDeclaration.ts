// parseDeclaration.ts
import { TokenType } from "../../lexer/tokens";
import { Declaration } from "../ast";
import { current, next } from "../../lexer/lexerHelpers/lexerUtils";
import cssPropertiesData from "mdn-data/css/properties.json"; 

export function parseDeclaration(): Declaration {
  const propertyToken = current();

  console.log(`Starting parseDeclaration at position ${propertyToken.position}`);

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

  console.log(`Property '${propertyName}' is valid`);
  next(); 

  // Expect and validate the colon `:`
  const colonToken = current();
  if (colonToken.type !== TokenType.Symbol || colonToken.value !== ":") {
    throw new Error(
      `Expected ':' after property name at position ${colonToken.position}`
    );
  }
  console.log(`Found ':' at position ${colonToken.position}`);
  next();

  // Parse the value
  const valueToken = current();
  console.log(`Parsing value: ${valueToken.value} at position ${valueToken.position}`);
  let validValues: string[] = [];

  // Use the `values` or `syntax` properties for validation if available
  if ("values" in propertyDetails) {
    validValues =
      (propertyDetails as any).values?.map((val: any) => val.name) || [];
  }

  if (
    !validValues.includes(valueToken.value) &&
    valueToken.type !== TokenType.Unit && // For numeric units like '10px'
    valueToken.type !== TokenType.Number && // For numeric values like '0'
    valueToken.type !== TokenType.Color // For color values like '#fff', if applicable
  ) {
    throw new Error(
      `Invalid value '${valueToken.value}' for property '${propertyName}' at position ${valueToken.position}`
    );
  }

  console.log(`Value '${valueToken.value}' is valid for property '${propertyName}'`);
  next(); // Move past the value

  // Expect and validate the semicolon `;`
  const semicolonToken = current();
  if (semicolonToken.type !== TokenType.Symbol || semicolonToken.value !== ";") {
    throw new Error(
      `Expected ';' at the end of declaration at position ${semicolonToken.position}`
    );
  }
  console.log(`Found ';' at position ${semicolonToken.position}`);
  next(); // Move past `;`

  console.log(`Successfully parsed declaration for property '${propertyName}'`);

  return {
    type: "Declaration",
    property: propertyName,
    value: valueToken.value,
  };
}
