// Main CLI entry point
import { processSparkFile } from '../processor';
import * as fs from 'fs';
import * as path from 'path';

// Define CLI functionality
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: sparkcss <input.sparks> <output.css>');
  process.exit(1);
}

const inputPath = path.resolve(args[0]);
const outputPath = path.resolve(args[1]);

// Check if input file exists
if (!fs.existsSync(inputPath)) {
  console.error(`Input file ${inputPath} does not exist.`);
  process.exit(1);
}

// Process Spark file and generate CSS
processSparkFile(inputPath, outputPath);
