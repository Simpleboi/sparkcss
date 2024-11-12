import { TokenType } from "../tokens";
import { addToken, peek, advance, getPosition, getInput } from "./lexerUtils";

export function readProperty() {
    let property = "";

    // Read property name (e.g., 'color', 'padding')
    while (getPosition() < getInput().length && /[a-zA-Z0-9_-]/.test(peek())) {
        property += advance();
    }

    addToken(TokenType.Property, property);
}
