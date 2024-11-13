// parser.ts
// parser.ts
import { Token, TokenType } from "../lexer/tokens";
import { Stylesheet } from "./ast";
import {
  current,
  next,
  skipEmptyTokens,
  initializeParser,
  isEndOfTokens,
} from "../lexer/lexerHelpers/lexerUtils";
import { parseRule } from "./parseHelpers/parseRule";
import { parseVariable } from "./parseHelpers/parseVariable";

export function parse(inputTokens: Token[]): Stylesheet {
  initializeParser(inputTokens);

  const stylesheet: Stylesheet = {
    type: "Stylesheet",
    rules: [],
  };

  // Parsing loop
  while (!isEndOfTokens()) {
    skipEmptyTokens();

    // Re-check end of tokens after skipping empty ones
    if (isEndOfTokens()) {
      break;
    }

    const token = current();

    console.log(
      `Processing token: { type: ${token.type}, value: ${token.value}, position: ${token.position} }`
    );

    if (token.type === TokenType.Variable) {
      // Parse the variable
      parseVariable();
    } else if (token.type === TokenType.Selector) {
      // Parse the CSS rule and add it to the stylesheet
      stylesheet.rules.push(parseRule());

      // After parsing a rule, ensure we move forward to the next meaningful token
      next();
    } else if (token.type === TokenType.EOF) {
      // Break the loop if we reach the end of the file
      break;
    } else {
      // Throw an error for unexpected tokens
      throw new Error(
        `Unexpected token: ${token.value} at position ${token.position}`
      );
    }
  }

  console.log("End of tokens reached, parsing completed.");
  return stylesheet;
}
