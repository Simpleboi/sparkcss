// Semantic analysis, error handling

// semanticAnalyzer.ts

import { Stylesheet, ASTNode, Snippet, SnippetApplication } from "./ast";

export function analyze(ast: Stylesheet): Stylesheet {
  const snippets = new Map<string, Snippet>();

  // First pass: collect all snippets
  for (const node of ast.body) {
    if (node.type === "Snippet") {
      snippets.set(node.name, node);
    }
  }

  // Second pass: expand snippet applications
  function expand(node: ASTNode): ASTNode {
    if (node.type === "SnippetApplication") {
      const snippet = snippets.get(node.name);
      if (!snippet) {
        throw new Error(`Snippet "${node.name}" not defined`);
      }

      // Return a copy of the snippet’s declarations
      return {
        type: "Rule",
        selectors: [],
        declarations: snippet.declarations,
      };
    }
    return node;
  }

  ast.body = ast.body.map(expand);
  return ast;
}
