// parser.ts
import { Token, TokenType } from "../lexer/tokens";
import { Stylesheet, Rule, Declaration } from "./ast";
import { cssPropertyValues } from "../css/cssPropertiesMappings";
import { cssProperties } from "../css/cssProperties";

let currentIndex = 0;
let tokens: Token[] = [];

export function parse(inputTokens: Token[]): Stylesheet {
  // Assign the input tokens to the global tokens array
  tokens = inputTokens;
  currentIndex = 0;

  const stylesheet: Stylesheet = {
    type: "Stylesheet",
    rules: [],
  };

  while (currentIndex < tokens.length) {
    // Skip any empty tokens
    skipEmptyTokens();

    // No more tokens to process
    if (currentIndex >= tokens.length) {
      break;
    }

    const token = current();

    // Debug log to track token processing
    console.log(
      `Processing token: { type: ${token.type}, value: ${token.value}, position: ${token.position} }`
    );

    // Handle variable declarations
    if (token.type === TokenType.Variable) {
      parseVariableDeclaration(); // Parse and store variable
    }
    // Handle CSS rules
    else if (token.type === TokenType.Selector) {
      stylesheet.rules.push(parseRule());
    }
    // Handle end of file
    else if (token.type === TokenType.EOF) {
      break;
    }
    // Unexpected tokens
    else {
      throw new Error(
        `Unexpected token: ${token.value} at position ${token.position}`
      );
    }
  }

  return stylesheet;
}

function skipEmptyTokens() {
  while (currentIndex < tokens.length && current().value === "") {
    next();
  }
}

function current(): Token {
  if (currentIndex >= tokens.length) {
    throw new Error(`Unexpected end of input at index ${currentIndex}`);
  }
  return tokens[currentIndex];
}

function next(): void {
  currentIndex++;
}

function parseRule(): Rule {
  const selectorToken = current();
  if (selectorToken.type !== TokenType.Selector) {
    throw new Error(
      `Expected Selector, but got ${selectorToken.type} at position ${selectorToken.position}`
    );
  }

  const rule: Rule = {
    type: "Rule",
    selector: selectorToken.value,
    declarations: [],
  };
  next();

  if (current().type !== TokenType.Symbol || current().value !== "{") {
    throw new Error(`Expected '{' after selector`);
  }
  next();

  // Parse all declarations inside the rule
  while (current().type !== TokenType.Symbol || current().value !== "}") {
    rule.declarations.push(parseDeclaration());
  }

  next();
  return rule;
}

function parseDeclaration(): Declaration {
  const propertyToken = current();

  // Validate the property name
  if (
    propertyToken.type !== TokenType.Property &&
    propertyToken.type !== TokenType.Identifier
  ) {
    throw new Error(
      `Expected Property, but got ${propertyToken.type} at position ${propertyToken.position}`
    );
  }

  // Check if the property is a valid CSS property
  const propertyName = propertyToken.value;
  if (!cssProperties.includes(propertyName)) {
    throw new Error(
      `Unknown property '${propertyName}' at position ${propertyToken.position}`
    );
  }

  next();

  // Expect and validate the colon `:`
  if (current().type !== TokenType.Symbol || current().value !== ":") {
    throw new Error(
      `Expected ':' after property name at position ${current().position}`
    );
  }
  next(); // Move past `:`

  // Parse the value
  const valueToken = current();
  const validValues = cssPropertyValues[propertyName] || []; // Get valid values for the property

  if (
    !validValues.includes(valueToken.value) &&
    valueToken.type !== TokenType.Unit && // For numeric units like '10px'
    valueToken.type !== TokenType.Number // For numeric values like '0'
  ) {
    throw new Error(
      `Invalid value '${valueToken.value}' for property '${propertyName}' at position ${valueToken.position}`
    );
  }

  next(); // Move past the value

  // Expect and validate the semicolon `;`
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

// Variable dictionary to store variables and their values
const variableDict: { [key: string]: string } = {};
function parseVariableDeclaration(): void {
  const variableToken = current();
  if (variableToken.type !== TokenType.Variable) {
    throw new Error(`Expected a Variable, but got ${variableToken.type}`);
  }
  next(); // Move past the variable token

  // Expect a colon after the variable name
  if (current().type !== TokenType.Symbol || current().value !== ":") {
    throw new Error(`Expected ':' after variable name`);
  }
  next(); // Move past the colon

  // Read the value after the colon
  const valueToken = current();
  if (
    valueToken.type !== TokenType.Value &&
    valueToken.type !== TokenType.Color &&
    valueToken.type !== TokenType.Number
  ) {
    throw new Error(`Expected a value after ':' for the variable`);
  }
  next(); // Move past the value

  // Store the variable and its value in the dictionary
  variableDict[variableToken.value] = valueToken.value;

  // Expect a semicolon at the end of the declaration
  if (current().type !== TokenType.Symbol || current().value !== ";") {
    throw new Error(`Expected ';' at the end of variable declaration`);
  }
  next(); // Move past the semicolon
}
