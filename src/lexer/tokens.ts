// Token definition
export enum TokenType {
  Variable,       // For Variables like $padding
  Number,         // For Numeric values like 10, 5
  Directive,      // For directives like @responsive
  Unit,           // For units like px, rem, % 
  Operator,       // For operations like +, -, *
  Selector,       // For selectors like .class-name
  Identifier,     // I don't know 
  Color,          // For colors like #fff or #fffeee
  Property,       // For CSS specifc properties
  Value,          // For CSS specific values
  Symbol,         // For symbols like {} ; :
  Keyword,        // For SparkCSS specifc keywords
  Snippet,        // Snippet directive
  Apply,          // To apply Snippets
  EOF,
}

export interface Token {
  type: TokenType;
  value: string;
  position: number;
}
