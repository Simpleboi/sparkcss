// parseApply.ts
import { TokenType } from "../../lexer/tokens";
import { Declaration } from "../ast";
import { current, next, expectToken } from "../../lexer/lexerHelpers/lexerUtils";
import { getSnippetDeclarations } from "../parseHelpers/snippetRegistry";  // Make sure this import is correct

export function parseApply(declarations: Declaration[]): void {
  // Ensure we are dealing with the `@apply` directive
  const applyKeywordToken = current();

  if (applyKeywordToken.type !== TokenType.DirectiveKeyword || applyKeywordToken.value !== "apply") {
    throw new Error(`Expected an Apply directive, but got ${applyKeywordToken.type} at position ${applyKeywordToken.position}`);
  }

  next(); // Move past the 'apply' keyword

  // Expect a colon (`:`)
  expectToken(TokenType.Colon, "Expected ':' after 'apply' directive");

  next(); // Move past ':'

  // Read the snippet name to apply
  const snippetNameToken = current();
  if (snippetNameToken.type !== TokenType.DirectiveName) {
    throw new Error(`Expected snippet name after 'apply:' at position ${snippetNameToken.position}`);
  }

  const snippetName = snippetNameToken.value;
  next(); // Move past snippet name

  // Expect and handle parentheses `()`
  expectToken(TokenType.Parameters, "Expected '()' after snippet name");

  next(); // Move past parameters

  // Get the declarations for the snippet
  const snippetDeclarations = getSnippetDeclarations(snippetName);
  if (!snippetDeclarations) {
    throw new Error(`Snippet '${snippetName}' not found at position ${snippetNameToken.position}`);
  }

  // Add all declarations from the snippet to the rule's declarations
  declarations.push(...snippetDeclarations);

  // Expect and handle a semicolon (`;`)
  expectToken(TokenType.Semicolon, "Expected ';' after 'apply' directive");
  next(); // Move past `;`
}



