// cssPropertyMappings.ts

import { cssValues } from "./cssValues";

// Define mapping of CSS properties to valid values
export const cssPropertyValues: { [key: string]: string[] } = {
  color: cssValues.colors,
  background: cssValues.colors.concat(["transparent"]),
  display: cssValues.display,
  position: cssValues.position,
  // Map other properties to their valid value lists
};
