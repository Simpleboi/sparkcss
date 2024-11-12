import { TokenType } from "../tokens";
import { addToken, peek, advance, getPosition, getInput } from "../lexerHelpers/lexerUtils";


export function readVariable() {
    let variable = "";

    if (peek() === "$") {
        variable += advance(); // Capture the "$"

        while (getPosition() < getInput().length && /[a-zA-Z0-9_-]/.test(peek())) {
            variable += advance();
        }

        addToken(TokenType.Variable, variable);
    }
}