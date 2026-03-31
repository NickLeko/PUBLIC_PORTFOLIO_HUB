const fs = require("fs");
const path = require("path");

const config = require("../screenshots.config.js");

const rootDir = path.resolve(__dirname, "..");

function screenshotEntries() {
  return config.projects.flatMap((project) =>
    project.captures.map((capture) => ({
      project: project.label,
      filePath: path.resolve(rootDir, project.outputDir, capture.filename),
      filename: capture.filename,
      summary: capture.summary
    }))
  );
}

function main() {
  const missing = screenshotEntries().filter((entry) => !fs.existsSync(entry.filePath));

  if (missing.length) {
    console.error("Missing required screenshot files:");
    for (const entry of missing) {
      console.error(`- ${entry.project}: ${entry.filename} (${entry.summary})`);
    }
    process.exit(1);
  }

  console.log(`All ${screenshotEntries().length} expected screenshot files are present.`);
}

main();
