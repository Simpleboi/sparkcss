// Token definition
export enum TokenType {
  Identifier,
  Directive,
  Number, 
  Unit, 
  Color, 
  Operator,
  Selector,
  Property,
  Value,
  Symbol,
  Keyword,
  Variable,
  EOF,
}

export interface Token {
  type: TokenType;
  value: string;
  position: number; // Track the position for error reporting
}
