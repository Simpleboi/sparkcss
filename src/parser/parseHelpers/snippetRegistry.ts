// snippetRegistry.ts
import { Declaration } from "../ast";

const snippetRegistry: Record<string, Declaration[]> = {};

export function registerSnippet(name: string, declarations: Declaration[]): void {
  snippetRegistry[name] = declarations;
}

export function getSnippetDeclarations(name: string): Declaration[] {
  if (!snippetRegistry[name]) {
    throw new Error(`Snippet with name '${name}' not found.`);
  }
  return snippetRegistry[name];
}
