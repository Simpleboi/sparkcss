import { TokenType } from "../../lexer/tokens";
import { Snippet, Declaration } from "../ast";
import { current, next, expectToken, skipEmptyTokens } from "../../lexer/lexerHelpers/lexerUtils";
import { parseDeclaration } from "../parseHelpers/parseDeclaration";
import { registerSnippet } from "../parseHelpers/snippetRegistry";

export function parseSnippet(): Snippet {
  // We expect that the '@' has already been processed

  // Expect the keyword part of the directive to be 'snippet'
  expectToken(TokenType.DirectiveKeyword, "Expected 'snippet' keyword to start snippet", "snippet");
  next(); // Move past the 'snippet' keyword

  // Expect and get the snippet name
  expectToken(TokenType.DirectiveName, "Expected snippet name");
  const snippetName = current().value;
  next(); // Move past snippet name

  // Handle parameters, if any
  let parameters = "";
  if (current().type === TokenType.Parameters) {
    parameters = current().value;
    next(); // Move past parameters
  }

  skipEmptyTokens();

  // Expect opening curly brace
  expectToken(TokenType.CurlyStart, "Expected '{' to start snippet body");
  next(); // Move past the '{'

  const declarations: Declaration[] = [];

  // Parse all declarations until closing curly brace
  while (current().type !== TokenType.CurlyEnd) {
    skipEmptyTokens();
    declarations.push(parseDeclaration());
    skipEmptyTokens();
  }

  // Move past the closing curly brace
  expectToken(TokenType.CurlyEnd, "Expected '}' to close snippet body");
  next(); // Move past the '}'

  // Expect semicolon
  expectToken(TokenType.Semicolon, "Expected ';' after snippet body");
  next(); // Move past the ';'

  // Register the snippet (name and declarations)
  registerSnippet(snippetName, declarations);

  return {
    type: "Snippet",
    name: snippetName,
    parameters,
    declarations,
  };
}

