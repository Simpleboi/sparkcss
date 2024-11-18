import path from "path";
import { readFileSync, writeFileSync } from "fs";
import { generateTypography } from "./cssGenerators/genTypography";

function generateUtilities() {
  try {
    console.log("\n Current working directory:", process.cwd());
    console.log("\n");


    const config = JSON.parse(readFileSync('./config/spark.config.json', "utf-8"));

    // Generate the CSS based on enabled utilities in the configuration
    let cssOutput: string = "";

    if (config.utilities.typography) {
      cssOutput += generateTypography();
    }

    if (config.utilities.boxModel) {
      // cssOutput += generateBoxModel(config);
    }

    if (config.utilities.colors) {
      // cssOutput += generateColors(config);
    }

    if (config.utilities.spacing) {
      // cssOutput += generateSpacing(config);
    }

    // Write the generated CSS to a file
    writeFileSync(`./spark.css`, cssOutput, "utf-8");
  } catch (err) {
    console.error("Error reading configuration file:", err);
  }
}

generateUtilities();
