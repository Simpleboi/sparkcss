import { readFileSync, writeFileSync } from "fs";
import { generateTypography } from "./cssGenerators/genTypography";
import { generateSpacing } from "./cssGenerators/genSpacing";
import { generateBoxModel } from "./cssGenerators/genBoxmodel";
import { generateColors } from "./cssGenerators/genColors";
import { generateDisplay } from "./cssGenerators/genDisplay";

function generateUtilities() {
  try {
    // Read the contents of the config file
    const config = JSON.parse(
      readFileSync("../config/spark.config.json", "utf-8")
    );

    // Generate the CSS based on enabled utilities
    let cssOutput: string = "";

    if (config.utilities.boxModel) {
      cssOutput += generateBoxModel(config);
    }
    if (config.utilities.colors) {
      cssOutput += generateColors(config);
    }
    if (config.utilities.spacing) {
      cssOutput += generateSpacing(config);
    }
    if (config.utilities.typography) {
      cssOutput += generateTypography(config);
    }
    if (config.utilities.display) {
      cssOutput += generateDisplay(config);
    }

    // Write the generated CSS to a file
    writeFileSync(`./spark.css`, cssOutput, "utf-8");
    console.log("CSS generated and written to spark.css")
  } catch (err) {
    console.error("Error reading configuration file:", err);
  }
}

generateUtilities();
