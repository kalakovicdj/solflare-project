import fs from "fs";
import path from "path";
import logger from "../logger/logger";

// Create a directory if it doesn't exist
function ensureDirectoryExists(directory: string) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
}

// Export a function to capture and save a screenshot
export async function saveScreenshotOnFailure(testTitle: string) {
  const screenshotsDir = path.resolve(__dirname, "../../screenshots");
  ensureDirectoryExists(screenshotsDir);

  const screenshotPath = path.join(
    screenshotsDir,
    `${testTitle.replace(/\s+/g, "_")}.png`
  );

  await browser.saveScreenshot(screenshotPath);
  logger.info(`Screenshot saved: ${screenshotPath}`);
}
