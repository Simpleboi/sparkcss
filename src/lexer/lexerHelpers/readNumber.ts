import { TokenType } from "../tokens";
import { addToken, peek, advance, getPosition, getInput } from "./lexerUtils";

export function readNumber() {
  let number = "";

  // Read the integer or decimal part of the number
  while (getPosition() < getInput().length && /[0-9.]/.test(peek())) {
    number += advance();
  }

  // Check if there's a unit following the number
  let unit = "";
  while (getPosition() < getInput().length && /[a-z%]/i.test(peek())) {
    unit += advance();
  }

  if (unit) {
    addToken(TokenType.Unit, number + unit); // Combine number and unit as a single token
  } else {
    addToken(TokenType.Number, number); // Just a number without unit
  }
}
