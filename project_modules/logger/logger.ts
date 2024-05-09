// Import the 'winston' package
import {
  createLogger,
  format as _format,
  transports as _transports,
} from "winston";

// Create the logger with various transports
const logger = createLogger({
  level: "info", // You can set this to 'debug', 'warn', etc.
  format: _format.combine(
    _format.timestamp(),
    _format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new _transports.Console(), // Outputs logs to the console
    new _transports.File({ filename: "logs/app.log" }), // Saves logs to a file
  ],
});

// Export the logger for use in other files
export default logger;
