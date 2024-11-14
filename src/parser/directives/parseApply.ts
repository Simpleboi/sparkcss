import { TokenType } from "../../lexer/tokens";
import { Declaration } from "../ast";
import { current, next } from "../../lexer/lexerHelpers/lexerUtils";
import { getSnippetDeclarations } from "./parseSnippet";

export function parseApply(ruleDeclarations: Declaration[]): void {
  const applyToken = current();

  if (applyToken.type !== TokenType.Apply) {
    throw new Error(`Expected an Apply directive, but got ${applyToken.type}`);
  }
  next(); // Move past the apply directive

  const snippetNameToken = current();
  if (snippetNameToken.type !== TokenType.Identifier) {
    throw new Error(
      `Expected an identifier for snippet name, but got ${snippetNameToken.type}`
    );
  }

  const snippetName = snippetNameToken.value;
  next();

  // Get declarations from the snippet and add them to the rule
  const snippetDeclarations = getSnippetDeclarations(snippetName);
  ruleDeclarations.push(...snippetDeclarations);
}
