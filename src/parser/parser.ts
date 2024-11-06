// parser implementation

import { Token, TokenType } from "../lexer/tokens";
import { Stylesheet, Rule, Declaration, Snippet, Directive, ASTNode } from "./ast";

export class Parser {
  private tokens: Token[];
  private current: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  parse(): Stylesheet {
    const body: ASTNode[] = [];
    while (!this.isAtEnd()) {
      body.push(this.parseStatement());
    }
    return { type: "Stylesheet", body };
  }

  private parseStatement(): ASTNode {
    const token = this.peek();

    if (token.type === TokenType.Selector) {
      return this.parseRule();
    } else if (token.type === TokenType.Directive && token.value === "@snippet") {
      return this.parseSnippet();
    } else if (token.type === TokenType.Directive) {
      return this.parseDirective();
    } else {
      throw new Error(`Unexpected token: ${token.value} at position ${token.position}`);
    }
  }

  private parseRule(): Rule {
    const selectors: string[] = [];
    while (this.match(TokenType.Selector)) {
      selectors.push(this.previous().value);
    }

    this.consume(TokenType.Symbol, "{");

    const declarations: Declaration[] = [];
    while (!this.check(TokenType.Symbol, "}")) {
      declarations.push(this.parseDeclaration());
    }

    this.consume(TokenType.Symbol, "}");

    return { type: "Rule", selectors, declarations };
  }

  private parseDeclaration(): Declaration {
    const property = this.consume(TokenType.Property).value;
    this.consume(TokenType.Symbol, ":");
    const value = this.consume(TokenType.Value).value;
    this.consume(TokenType.Symbol, ";");

    return { type: "Declaration", property, value };
  }

  private parseSnippet(): Snippet {
    this.consume(TokenType.Directive, "@snippet");
    const name = this.consume(TokenType.Identifier).value;
    const parameters: string[] = [];

    if (this.match(TokenType.Symbol, "(")) {
      do {
        parameters.push(this.consume(TokenType.Identifier).value);
      } while (this.match(TokenType.Symbol, ","));
      this.consume(TokenType.Symbol, ")");
    }

    this.consume(TokenType.Symbol, "{");

    const declarations: Declaration[] = [];
    while (!this.check(TokenType.Symbol, "}")) {
      declarations.push(this.parseDeclaration());
    }

    this.consume(TokenType.Symbol, "}");

    return { type: "Snippet", name, parameters, declarations };
  }

  private parseDirective(): Directive {
    const name = this.advance().value;
    const condition = this.match(TokenType.Identifier) ? this.previous().value : undefined;
    this.consume(TokenType.Symbol, "{");

    const body: ASTNode[] = [];
    while (!this.check(TokenType.Symbol, "}")) {
      body.push(this.parseStatement());
    }

    this.consume(TokenType.Symbol, "}");

    return { type: "Directive", name, condition, body };
  }

  private match(type: TokenType, value?: string): boolean {
    if (this.check(type, value)) {
      this.advance();
      return true;
    }
    return false;
  }

  private check(type: TokenType, value?: string): boolean {
    if (this.isAtEnd()) return false;
    const token = this.peek();
    return token.type === type && (value === undefined || token.value === value);
  }

  private consume(type: TokenType, value?: string): Token {
    if (this.check(type, value)) return this.advance();
    throw new Error(`Expected ${value || type} but got ${this.peek().value}`);
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private isAtEnd(): boolean {
    return this.current >= this.tokens.length || this.peek().type === TokenType.EOF;
  }
}
