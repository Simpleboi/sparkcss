// ast.ts

export interface Stylesheet {
  type: "Stylesheet";
  rules: Rule[];
  snippets: Snippet[];
}

export interface Rule {
  type: "Rule";
  selector: string;
  declarations: Declaration[];
}

export interface Snippet {
  type: "Snippet";
  name: string;
  parameters: string;
  declarations: Declaration[];
}

export type Declaration = {
  type: "Declaration";
  property: string;
  value: string;
};

// Add ApplySnippet definition (optional)
export interface ApplySnippet {
  type: "ApplySnippet";
  snippetName: string;
}

export type ASTNode = Stylesheet | Rule | Declaration | Snippet | ApplySnippet;
