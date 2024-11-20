
export function generateBoxModel(config: any): string {
    
    // Grab the box model utilities
    const boxModel = config.boxModel;
    let cssOutput = "";

    // Generate the Margin utilities
    if (boxModel && boxModel.margin) {
        cssOutput += "/* Margin Utility Classes*/\n"
        for (const [key, size] of Object.entries(boxModel.margin)) {
            cssOutput += `.mg-${key} { margin: ${size};} \n`
        }
        cssOutput += "\n";
    }

    // Generate the Padding utilities
    if (boxModel && boxModel.madding) {
        cssOutput += "/* Padding Utility Classes*/\n"
        for (const [key, size] of Object.entries(boxModel.padding)) {
            cssOutput += `.pd-${key} { padding: ${size};} \n`
        }
        cssOutput += "\n";
    }

    // Generate the Width utilities
    if (boxModel && boxModel.width) {
        cssOutput += "/* Width Utility Classes*/\n"
        for (const [key, size] of Object.entries(boxModel.width)) {
            cssOutput += `.wd-${key} { width: ${size};} \n`
        }
        cssOutput += "\n";
    }

    // Generate the Height utilities
    if (boxModel && boxModel.height) {
        cssOutput += "/* Height Utility Classes*/\n"
        for (const [key, size] of Object.entries(boxModel.height)) {
            cssOutput += `.height-${key} { height: ${size};} \n`
        }
        cssOutput += "\n";
    }

    // Generate the Border Radius utilities
    if (boxModel && boxModel.borderRadius) {
        cssOutput += "/* Border Radius Utility Classes*/\n"
        for (const [key, size] of Object.entries(boxModel.borderRadius)) {
            cssOutput += `.bdr-${key} { border-radius: ${size};} \n`
        }
        cssOutput += "\n";
    }

    return cssOutput;
    
}