// ast.ts

export type Stylesheet = {
  type: "Stylesheet";
  rules: Rule[];
};

export type Rule = {
  type: "Rule";
  selector: string;
  declarations: Declaration[];
};

export type Declaration = {
  type: "Declaration";
  property: string;
  value: string;
};

export interface Snippet {
  type: "Snippet";
  name: string;
  declarations: Declaration[];
}

// Add ApplySnippet definition (optional)
export interface ApplySnippet {
  type: "ApplySnippet";
  snippetName: string;
}

export type ASTNode = Stylesheet | Rule | Declaration | Snippet | ApplySnippet;
