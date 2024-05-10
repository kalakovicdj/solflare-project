const fs = require('fs');

import { execSync } from "child_process";
import type { Options } from "@wdio/types";
import path from "path";
import logger from "./project_modules/logger/logger";

const browserName = process.env.BROWSER || "all";
const isHeadless = process.env.HEADLESS === "true";
const logFilePath = path.resolve(__dirname, "logs/app.log");
const allureResultsDir = path.join(__dirname, 'allure-results');

export const config: Options.Testrunner = {
  // ====================
  // Runner Configuration
  // ====================
  runner: "local",
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: "./tsconfig.json",
      transpileOnly: true,
    },
  },
  baseUrl: "https://solflare.com",

  // ==================
  // Specify Test Files
  // ==================
  specs: ["./test/specs/*.ts"],
  exclude: [],

  // ============
  // Capabilities
  // ============
  maxInstances: 1,
  capabilities: [
    // Chrome
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        prefs: {
          'profile.default_content_setting_values.notifications': 2, // Disable notifications
          'profile.default_content_setting_values.clipboard': 1 // Allow clipboard access
        },
        args: isHeadless
          ? ['--headless',
          '--disable-gpu',
          '--window-size=1280,800',
          '--allow-file-access-from-files',
          '--use-fake-ui-for-media-stream',
          '--enable-clipboard']
          : ["--disable-gpu", "--window-size=1280,800"]
      }
    },
  
    // Firefox
    {
      browserName: "firefox",
      "moz:firefoxOptions": {
        prefs: {
          'dom.webnotifications.enabled': false, // Disable notifications
          'dom.events.clipboardevents.enabled': true // Allow clipboard access
        },
        args: isHeadless
          ? ["-headless", "--window-size=1280,800"]
          : ["--window-size=1280,800"]
      }
    },
  
    // Microsoft Edge
    {
      browserName: "MicrosoftEdge",
      'ms:edgeOptions': {
        prefs: {
          'profile.default_content_setting_values.notifications': 2, // Disable notifications
          'profile.default_content_setting_values.clipboard': 1 // Allow clipboard access
        },
        args: isHeadless
          ? ["--headless", "--disable-gpu", "--window-size=1280,800"]
          : ["--disable-gpu", "--window-size=1280,800"],
          binary: '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      }
    }
  ].filter(cap => browserName === "all" || cap.browserName === browserName),


  // ===================
  // Test Configurations
  // ===================
  logLevel: "trace",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  reporters: [
    [
      'allure',
      {
        outputDir: allureResultsDir,
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  // =====
// Hooks
// =====
//clean up log file and  clean up allure-results before running the tests

onPrepare: function () {
  //clear log file
  if (fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, "");
    logger.info(`Log file ${logFilePath} cleared before tests.`);
  }

  // Clear the Allure results directory before the test run
  if (fs.existsSync(allureResultsDir)) {
    fs.rmdirSync(allureResultsDir, { recursive: true });
    logger.info(`Allure results directory '${allureResultsDir}' cleared.`);
  } else {
    logger.info(`Allure results directory '${allureResultsDir}' does not exist.`);
  }
},
/**
 * Hook that is executed after all tests are completed.
 * This hook will automatically generate and open the Allure report.
 *
 * @param {number} _result 0 - test pass, 1 - test fail
 * @param {Array.<Object>} _capabilities list of capability details
 * @param {Array.<String>} _specs list of spec files that were executed
 */
  after: function (_result, _capabilities, _specs) {
    try {
      const allureResultsPath = './allure-results'; // Define the path to the allure-results directory

      // Check if the allure-results directory exists and it contains files
      if (fs.existsSync(allureResultsPath) && fs.readdirSync(allureResultsPath).length > 0) {
        // Generate the Allure report
        execSync(`npx allure generate ${allureResultsPath} --clean -o allure-report`, {
          stdio: "inherit",
        });
      } else {
        console.warn("No test results found in the allure-results directory.");
      }
    } catch (error) {
      console.error("Error while generating Allure report:", error);
    }
  },
};
