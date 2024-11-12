// parseRule.ts
import { TokenType, Token } from "../../lexer/tokens";
import { Rule, Declaration } from "../ast";
import { current, next } from "../../lexer/lexerHelpers/lexerUtils";
import { parseDeclaration } from "./parseDeclaration";

export function parseRule(): Rule {
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

  while (current().type !== TokenType.Symbol || current().value !== "}") {
    rule.declarations.push(parseDeclaration());
  }

  next();
  return rule;
}
