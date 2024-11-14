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
  DirectiveStart,   // Represents the '@' symbol
  DirectiveKeyword, // Represents the keyword of a directive (e.g., snippet)
  DirectiveName,    // Represents the name of a specific directive (e.g., flexboxCenter)
  CurlyStart,       // Represents the '{' symbol
  CurlyEnd,         // Represents the '}' symbol
  ParameterStart,   // Represents the '(' symbol
  ParameterEnd,     // Represents the ')' symbol
  Colon,            // Represents ':'
  Semicolon,        // Represents ';'
  Comma,            // Represents ','
  Parameters,
  EOF,
}

export interface Token {
  type: TokenType;
  value: string;
  position: number;
}
