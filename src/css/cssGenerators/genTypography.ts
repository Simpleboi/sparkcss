import { readFileSync} from "fs"; 

export function generateTypography(): string {
    // Read the configuration file
    const config = JSON.parse(readFileSync('../../../config/spark.config.json', 'utf-8'));

    // Extract the typography part of the configuration
    const type = config.typography;
    let cssOutput = "";

    // Generate the fontSizes utilities
    if (type && type.fontSizes) {
        for (const [key, size] of Object.entries(type.fontSizes)) {
            cssOutput += `.txt-${key} { font-size: ${size}}; \n`
        }
    }

    // Generate the fontWeight utilities
    if (type && type.fontWeight) {
        for (const [key, weight] of Object.entries(type.fontWeight)) {
            cssOutput += `.weight-${key} { font-size: ${weight}}; \n`
        }
    }

    return cssOutput;
}