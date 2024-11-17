// parseHelpers/parseRule.ts
// parseHelpers/parseRule.ts
// parseHelpers/parseRule.ts
import { current, next, skipEmptyTokens } from "../../lexer/lexerHelpers/lexerUtils";
import { Rule } from "../ast";
import { parseDeclaration } from "./parseDeclaration";
import { parseApply } from "../directives/parseApply";
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

  skipEmptyTokens();

  // Expect an opening brace `{` after the selector
  if (current().type !== TokenType.CurlyStart || current().value !== "{") {
    throw new Error(`Expected '{' after selector at position ${current().position}`);
  }
  console.log(`Found '{' after selector at position ${current().position}`);
  next(); // Move past `{`

  skipEmptyTokens();

  // Parse all declarations or directives inside the rule
  while (true) {
    const currentToken = current();

    // Check if we are at the closing brace `}`
    if (currentToken.type === TokenType.CurlyEnd && currentToken.value === "}") {
      console.log(`Found '}' closing the rule at position ${currentToken.position}`);
      next(); // Move past `}`
      break; // Exit the loop as we've reached the end of the rule
    }

    // Handle standard CSS property declaration
    if (currentToken.type === TokenType.Property) {
      console.log(`Parsing declaration inside rule at position ${currentToken.position}`);
      rule.declarations.push(parseDeclaration());
    }
    // Handle `@apply` directive
    else if (currentToken.type === TokenType.DirectiveStart) {
      next(); // Move past `@`
      const directiveKeywordToken = current();

      if (directiveKeywordToken.type === TokenType.DirectiveKeyword && directiveKeywordToken.value === "apply") {
        console.log(`Parsing @apply directive inside rule at position ${directiveKeywordToken.position}`);
        parseApply(rule.declarations);
      } else {
        throw new Error(
          `Unknown directive '${directiveKeywordToken.value}' at position ${directiveKeywordToken.position}`
        );
      }
    } else {
      throw new Error(
        `Unexpected token '${currentToken.value}' of type '${currentToken.type}' inside rule at position ${currentToken.position}`
      );
    }

    skipEmptyTokens();
  }

  skipEmptyTokens();
  
  // Handle Semi-colons
  if (current().type === TokenType.Semicolon) {
    console.log(`Skipping trailing semicolon at position ${current().position}`);
    next(); // Move past `;`
  }

  console.log(`Finished parsing rule for selector: ${rule.selector}`);
  return rule;
}


