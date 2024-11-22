#!/usr/bin/env ts-node
import { program } from "commander";
import { generateTypography } from "../css/cssGenerators/genTypography";
import { generateColors } from "../css/cssGenerators/genColors";
import { generateDisplay } from "../css/cssGenerators/genDisplay";
import { generateBoxModel } from "../css/cssGenerators/genBoxmodel";
import { generateSpacing } from "../css/cssGenerators/genSpacing";
import { generateTransform } from "../css/cssGenerators/genTransform";

import { readFileSync, writeFileSync } from "fs";
import path from "path";

program
  .version(`1.3.0`)
  .description("CLI to generate SparkCSS Utility Classes.")
  .option("--typography", "Generate typeography Utilities")
  .option("--box-model", "Generate Box Model Utilities")
  .option("--colors", "Generate Color Utilities")
  .option("--spacing", "Generate Spacing Utilities")
  .option("--display", "Generate Display Utilities")
  .option("--transform", "Generate Transform Utilities")
  .option("--help", "List out all the Utilities")
  .option("--all", "Generate All Utilities")
  .option("--output <path>", "Specify output file path", "./output.css");

program.parse(process.argv);

const options = program.opts();

const configPath = path.resolve(
  __dirname,
  "../../src/config/spark.config.json"
);
let config;

try {
  config = JSON.parse(readFileSync(configPath, "utf-8"));
} catch (err) {
  console.error("Error reading configuration file:", err);
  process.exit(1);
}

// Generate the CSS based on the options passed by the user
let cssOutput = "";

if (options.typography) {
  cssOutput += generateTypography(config);
}

if (options["box-model"]) {
  cssOutput += generateBoxModel(config);
}

if (options.colors) {
  cssOutput += generateColors(config);
}

if (options.spacing) {
  cssOutput += generateSpacing(config);
}

if (options.display) {
  cssOutput += generateDisplay(config);
}

if (options.all) {
  cssOutput += generateTypography(config);
  cssOutput += generateBoxModel(config);
  cssOutput += generateColors(config);
  cssOutput += generateSpacing(config);
  cssOutput += generateTransform(config);
  cssOutput += generateDisplay(config);
}

if (options.help) {
  console.log("\nThe following Commands are used to tell SparkCSS which Utility Classes to Generate\n");
  console.log("--typography | This generate all typography-based Utility Classes\n");
  console.log("--display | This generate all display-based Utility Classes\n");
  console.log("--colors | This generate all colors-based Utility Classes\n");
  console.log("--transform | This generate all transform-based Utility Classes\n");
  console.log("--spacing | This generate all spacing-based Utility Classes\n");
  console.log("--box-model | This generate all box-model-based Utility Classes\n");
  console.log("--all | This generate every Utility Classe SparkCSS has\n");
  console.log("--output <path> | This tell SparkCSS where to store the generated CSS file. If no output path is specifed, SparkCSS will generate the output file in the same directory this command is executed, titled 'output.css'\n");
  console.log("For more information about indiviaul Utility classes, refer to the docs\n GitHub: https://github.com/Simpleboi/sparkcss \nhttps://www.npmjs.com/package/sparkcss");
};


// Save the generated CSS to the specified output path
const outputPath = path.resolve(process.cwd(), options.output);

writeFileSync(outputPath, cssOutput, "utf-8");
console.log(`\nCSS file has been generated and saved to: ${outputPath}`);
