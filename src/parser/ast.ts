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

export type ASTNode = Stylesheet | Rule | Declaration;
