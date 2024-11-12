// parser.ts
import { Token, TokenType } from "../lexer/tokens";
import { Stylesheet } from "./ast";
import { current, next, skipEmptyTokens, initializeParser, isEndOfTokens } from "../lexer/lexerHelpers/lexerUtils";
import { parseRule } from "./parseHelpers/parseRule";
import { parseVariable } from "./parseHelpers/parseVariable";

export function parse(inputTokens: Token[]): Stylesheet {
  initializeParser(inputTokens);

  const stylesheet: Stylesheet = {
    type: "Stylesheet",
    rules: [],
  };

  while (!isEndOfTokens) {
    skipEmptyTokens();

    const token = current();

    console.log(
      `Processing token: { type: ${token.type}, value: ${token.value}, position: ${token.position} }`
    );

    if (token.type === TokenType.Variable) {
      parseVariable();
    } else if (token.type === TokenType.Selector) {
      stylesheet.rules.push(parseRule());
    } else if (token.type === TokenType.EOF) {
      break;
    } else {
      throw new Error(
        `Unexpected token: ${token.value} at position ${token.position}`
      );
    }
  }

  return stylesheet;
}
