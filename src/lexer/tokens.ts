// Token definition
export enum TokenType {
  Variable,       // For Variables like $padding
  Number,         // For Numeric values like 10, 5
  Directive,      // For directives like @responsive
  Unit,           // For units like px, rem, % 
  Operator,       // For operations like +, -, *
  Selector,       // For selectors like .class-name
  Identifier,     // 
  Color,          // For colors like #fff or #fffeee
  Property,       // For CSS specifc properties
  Value,
  Symbol,         // For symbols like {} ; :
  Keyword,
  EOF,
}

export interface Token {
  type: TokenType;
  value: string;
  position: number; // Track the position for error reporting
}
