import { TokenType } from "../../lexer/tokens";
import { Declaration, Snippet } from "../ast";
import {
  current,
  next,
  skipEmptyTokens,
} from "../../lexer/lexerHelpers/lexerUtils";
import { parseDeclaration } from "../parseHelpers/parseDeclaration";

const snippetStorage: Map<string, Snippet> = new Map();

// Snippets dictionary to store snippet definitions
export function parseSnippet(): Snippet {
  skipEmptyTokens();

  const snippetToken = current();

  if (
    snippetToken.type !== TokenType.Directive ||
    snippetToken.value !== "@snippet"
  ) {
    throw new Error(
      `Expected '@snippet', but got ${snippetToken.value} at position ${snippetToken.position}`
    );
  }

  next(); // Move past '@snippet'

  const snippetNameToken = current();

  if (snippetNameToken.type !== TokenType.Identifier) {
    throw new Error(
      `Expected a snippet name, but got ${snippetNameToken.value} at position ${snippetNameToken.position}`
    );
  }

  const snippetName = snippetNameToken.value;
  next(); // Move past snippet name

  if (current().type !== TokenType.Symbol || current().value !== "{") {
    throw new Error(
      `Expected '{' after snippet name at position ${current().position}`
    );
  }

  next(); // Move past '{'

  const declarations: Declaration[] = [];

  while (current().type !== TokenType.Symbol || current().value !== "}") {
    declarations.push(parseDeclaration());
  }

  next(); // Move past '}'

  const snippet: Snippet = {
    type: "Snippet",
    name: snippetName,
    declarations,
  };

  // Store the snippet in the global storage
  snippetStorage.set(snippetName, snippet);

  return snippet;
}

// Function to get snippet declarations by name
export function getSnippetDeclarations(snippetName: string): Declaration[] {
    const snippet = snippetStorage.get(snippetName);
    if (!snippet) {
      throw new Error(`Snippet '${snippetName}' not found.`);
    }
    return snippet.declarations;
  }