#!/usr/bin/env node
// Main CLI entry point
import { processSparkFile } from "../processor";
import * as fs from "fs";
import * as path from "path";

// Define CLI functionality
const args = process.argv.slice(2);

// Ensure only one argument (the input file) is provided
if (args.length !== 1) {
  console.error("Usage: sparky <input.spark>");
  process.exit(1);
}

const inputPath = path.resolve(args[0]);

// Check if the input file exists
if (!fs.existsSync(inputPath)) {
  console.error(`Input file ${inputPath} does not exist.`);
  process.exit(1);
}

// Automatically generate the output filename
const outputPath = inputPath.replace(/\.spark$/, ".css");

// Process Spark file and generate CSS
processSparkFile(inputPath, outputPath);

console.log(`Processed ${inputPath} and saved to ${outputPath}`);
