const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info', // Default log level
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // Include stack trace for errors
    format.json() // Log in JSON format
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: 'error.log', level: 'error' }) // Log errors to a file
  ],
});

module.exports = logger;
