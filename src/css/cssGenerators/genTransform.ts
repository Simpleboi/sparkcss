export function generateTransform(config: any): string {
  const transform = config.transform;
  let cssOutput = "";

  //  Generate Transform Animation Utility Classes
  if (transform && transform.animations) {
    cssOutput += "/* Animation Utility Classes*/\n";
    for (const [key, value] of Object.entries(transform.animations)) {
      cssOutput += `.animation-${key} { animation: ${value};} \n`;
    }
    cssOutput += "\n";
  }

  //  Generate Transform Transistion Utility Classes
  if (transform && transform.transitions) {
    cssOutput += "/* Transition Utility Classes*/\n";
    for (const [key, value] of Object.entries(transform.transitions)) {
      cssOutput += `.transitions-${key} { transition : ${value};} \n`;
    }
    cssOutput += "\n";
  }

  //  Generate Transform Shadows Utility Classes
  if (transform && transform.shadows) {
    cssOutput += "/* Shadow Utility Classes*/\n";
    for (const [key, value] of Object.entries(transform.shadows)) {
      cssOutput += `.shadow-${key} { box-shadow : ${value};} \n`;
    }
    cssOutput += "\n";
  }

  //  Generate Transform Shadows Utility Classes
  if (transform && transform.opacity) {
    cssOutput += "/* Opactiy Utility Classes*/\n";
    for (const [key, value] of Object.entries(transform.opacity)) {
      cssOutput += `.opacity-${key} { opacity : ${value};} \n`;
    }
    cssOutput += "\n";
  }

  return cssOutput;
}
