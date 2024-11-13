// parseHelpers/parseRule.ts
import { current, next } from "../../lexer/lexerHelpers/lexerUtils";
import { Rule } from "../ast";
import { parseDeclaration } from "./parseDeclaration";
import { TokenType } from "../../lexer/tokens";

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

  console.log(`Parsing rule for selector: ${selectorToken.value}`);
  next(); // Move past selector

  // Expect an opening brace `{` after the selector
  if (current().type !== TokenType.Symbol || current().value !== "{") {
    throw new Error(`Expected '{' after selector at position ${current().position}`);
  }
  console.log(`Found '{' after selector at position ${current().position}`);
  next(); // Move past `{`

  // Parse all declarations inside the rule
  while (true) {
    const currentToken = current();
    
    // Check if we are at the closing brace `}`
    if (currentToken.type === TokenType.Symbol && currentToken.value === "}") {
      console.log(`Found '}' closing the rule at position ${currentToken.position}`);
      next(); // Move past `}`
      break; // Exit the loop as we've reached the end of the rule
    }

    // Parse the next declaration and add it to the rule
    console.log(
      `Parsing declaration inside rule at position ${currentToken.position}`
    );
    rule.declarations.push(parseDeclaration());
  }

  console.log(`Finished parsing rule for selector: ${rule.selector}`);
  return rule;
}
