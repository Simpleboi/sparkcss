#!/usr/bin/env node
import { processSparkFile } from "./sparkcss";

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: sparkcss <input-file>");
  process.exit(1);
}

const outputPath = filePath.replace(/\.spark$/, ".css");
processSparkFile(filePath, outputPath);
