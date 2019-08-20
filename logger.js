const moment = require('moment');
const winston = require('winston');
const { format } = require('winston');

const addTimestamp = format((logObject) => {
  return {
    ...logObject,
    timestamp: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
  };
});

const logFormat = format.combine(
  addTimestamp(),
  format.colorize(),
  format.simple(),
);

const consoleLogTransport = new winston.transports.Console({
  format: logFormat,
});

const logger = winston.createLogger({
  level: 'info',
  transports: [consoleLogTransport],
  exceptionHandlers: [consoleLogTransport],
});

module.exports = logger;
