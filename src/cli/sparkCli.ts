#!/usr/bin/env ts-node
import { program } from "commander";
import { generateTypography } from "../css/cssGenerators/genTypography";
import { generateColors } from "../css/cssGenerators/genColors";
import { generateDisplay } from "../css/cssGenerators/genDisplay";
import { generateBoxModel } from "../css/cssGenerators/genBoxmodel";
import { generateSpacing } from "../css/cssGenerators/genSpacing";

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
  .option("--all", "Generate All Utilities")
  .option("--output <path>", "Specify output file path", "spark.css");

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
}

// Save the generated CSS to the specified output path
const outputPath = path.resolve(process.cwd(), options.output);

writeFileSync(outputPath, cssOutput, "utf-8");
console.log(`CSS file has been generated and saved to: ${outputPath}`);
