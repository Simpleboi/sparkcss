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
import { parseSnippet } from "./directives/parseSnippet";
import { parseApply } from "./directives/parseApply";

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
      parseVariable();
    } else if (token.type === TokenType.Selector) {
      stylesheet.rules.push(parseRule());
    } else if (token.type === TokenType.Snippet) {
      parseSnippet();
    } else if (token.type === TokenType.Apply) {
      parseApply(stylesheet.rules[stylesheet.rules.length - 1].declarations);
    } else if (token.type === TokenType.EOF) {
      break;
    } else {
      throw new Error(
        `Unexpected token: ${token.value} at position ${token.position}`
      );
    }
  }

  console.log("End of tokens reached, parsing completed.");
  return stylesheet;
}
