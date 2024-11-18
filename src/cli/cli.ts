#!/usr/bin/env node
// Main CLI entry point
import { processSparkFile } from "../core/processor";
import * as fs from "fs";
import * as path from "path";
import * as packageJson from '../../package.json';

// Define CLI functionality
let args = process.argv.slice(2);

// Handle --version or -v flag to display version
if (args.includes('--version') || args.includes('-v')) {
  console.log(`SparkCSS version: ${packageJson.version}`);
  process.exit(0);
}

// Ensure only one argument (the input file) is provided
if (args.length !== 1) {
  console.error("Usage: sparkup <input.spark>");
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
