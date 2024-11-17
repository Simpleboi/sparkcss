// parser.ts
import { Token, TokenType } from "../lexer/tokens";
import { Stylesheet, Rule, Snippet } from "./ast";
import { current, next, skipEmptyTokens, initializeParser, isEndOfTokens } from "../lexer/lexerHelpers/lexerUtils";
import { parseRule } from "./parseHelpers/parseRule";
import { parseVariable } from "./parseHelpers/parseVariable";
import { parseSnippet } from "./directives/parseSnippet";

export function parse(inputTokens: Token[]): Stylesheet {
  initializeParser(inputTokens);

  const stylesheet: Stylesheet = {
    type: "Stylesheet",
    rules: [],
    snippets: [],
  };

  while (!isEndOfTokens()) {
    skipEmptyTokens();

    // Check if we have reached the end of the tokens
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
    } else if (token.type === TokenType.DirectiveStart) {
      // Move past the '@' symbol
      next();
      const directiveToken = current();

      // Check if the directive is `snippet`
      if (directiveToken.type === TokenType.DirectiveKeyword && directiveToken.value === "snippet") {
        // Parse the snippet and add it to the stylesheet
        stylesheet.snippets.push(parseSnippet());
      } else {
        throw new Error(`Unexpected directive: ${directiveToken.value} at position ${directiveToken.position}`);
      }
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

  return stylesheet;
}



