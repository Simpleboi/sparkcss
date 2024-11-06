// Parser tests

import { lexer } from "../lexer/lexer";
import { Parser } from "./parser";
import { analyze } from "./semanticAnalyzer";

describe("Parser Tests", () => {
  test("should parse a simple rule", () => {
    const tokens = lexer(".my-class { color: red; padding: 10px; }");
    const parser = new Parser(tokens);
    const ast = parser.parse();

    expect(ast).toEqual({
      type: "Stylesheet",
      body: [
        {
          type: "Rule",
          selectors: [".my-class"],
          declarations: [
            { type: "Declaration", property: "color", value: "red" },
            { type: "Declaration", property: "padding", value: "10px" },
          ],
        },
      ],
    });
  });

  test("should parse a snippet", () => {
    const tokens = lexer("@snippet buttonStyles { padding: 10px; }");
    const parser = new Parser(tokens);
    const ast = parser.parse();

    expect(ast).toEqual({
      type: "Stylesheet",
      body: [
        {
          type: "Snippet",
          name: "buttonStyles",
          parameters: [],
          declarations: [
            { type: "Declaration", property: "padding", value: "10px" },
          ],
        },
      ],
    });
  });

  test("should expand snippet applications", () => {
    const tokens = lexer(`
      @snippet buttonStyles { padding: 10px; }
      .button { @apply buttonStyles; }
    `);
    const parser = new Parser(tokens);
    const ast = analyze(parser.parse());

    expect(ast).toEqual({
      type: "Stylesheet",
      body: [
        {
          type: "Snippet",
          name: "buttonStyles",
          parameters: [],
          declarations: [
            { type: "Declaration", property: "padding", value: "10px" },
          ],
        },
        {
          type: "Rule",
          selectors: [".button"],
          declarations: [
            { type: "Declaration", property: "padding", value: "10px" },
          ],
        },
      ],
    });
  });
});
