// Abstract Syntax Tree / node definition
// ast.ts

export interface Stylesheet {
  type: "Stylesheet";
  body: ASTNode[];
}

export type ASTNode =
  | Rule
  | Declaration
  | Snippet
  | SnippetApplication
  | Directive;

export interface Rule {
  type: "Rule";
  selectors: string[]; // Like [".my-class", "#id"]
  declarations: Declaration[];
}

export interface Declaration {
  type: "Declaration";
  property: string; // Like "color", "padding"
  value: string; // e.g., "red", "10px"
}

export interface Snippet {
  type: "Snippet";
  name: string; // e.g., "buttonStyles"
  parameters: string[]; // e.g., ["color"]
  declarations: Declaration[];
}

export interface SnippetApplication {
  type: "SnippetApplication";
  name: string; // e.g., "buttonStyles"
  arguments: string[]; // e.g., ["#3498db"]
}

export interface Directive {
  type: "Directive";
  name: string; // e.g., "@if", "@responsive"
  condition?: string; // Condition for `@if` statements
  body: ASTNode[]; // Nested rules or declarations inside directives
}
