function parseArrayDirective(input: string): {
  name: string;
  values: string[];
} {
  let position = 0;

  function peek() {
    return input[position];
  }

  function advance() {
    return input[position++];
  }

  function skipWhitespace() {
    while (/\s/.test(peek())) {
      advance();
    }
  }

  function expect(char: string) {
    if (peek() !== char) {
      throw new Error(`Expected '${char}' at position ${position}`);
    }
    return advance();
  }

  function readIdentifier(): string {
    let identifier = "";
    while (/[a-zA-Z0-9_-]/.test(peek())) {
      identifier += advance();
    }
    return identifier;
  }

  function readArrayValues(): string[] {
    const values: string[] = [];
    let value = "";

    while (peek() !== "]") {
      const char = peek();

      if (char === ",") {
        values.push(value.trim());
        value = "";
        advance(); // Skip comma
      } else if (/\s/.test(char)) {
        advance(); // Skip whitespace
      } else {
        value += advance();
      }
    }

    if (value) {
      values.push(value.trim());
    }

    return values;
  }

  // Parsing starts here
  skipWhitespace();

  // Expect `@array`
  if (input.slice(position, position + 6) !== "@array") {
    throw new Error(`Expected '@array' at position ${position}`);
  }
  position += 6;

  skipWhitespace();

  // Expect colon `:`
  expect(":");

  skipWhitespace();

  // Read array name
  const name = readIdentifier();

  skipWhitespace();

  // Expect opening bracket `[`
  expect("[");

  skipWhitespace();

  // Read array values
  const values = readArrayValues();

  // Expect closing bracket `]`
  expect("]");

  skipWhitespace();

  // Expect semicolon `;`
  expect(";");

  return { name, values };
}


const input = "@array: colors [#ff5733, #33ff57, #3357ff];";
const parsed = parseArrayDirective(input);

console.log(parsed);
