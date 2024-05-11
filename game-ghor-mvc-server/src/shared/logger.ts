import { createLogger, format, transports } from 'winston';
import config from '../config';
import path from 'path';
import moment from 'moment';
import DailyRotateFile from 'winston-daily-rotate-file';

const {
  combine,
  timestamp,
  label,
  printf,
  // prettyPrint
} = format;

// custom logger format

const myFormat = printf(({ level, message, label, timestamp }): string => {
  const time = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
  return `{${time} } [${label}] ${level} ${message} `;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'PH' }),
    timestamp(),
    myFormat,
    // prettyPrint()
  ),
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'UMS-%DATE%-success.log',
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'PH' }),
    timestamp(),
    myFormat,
    // prettyPrint()
  ),
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'UMS-%DATE%-error.log',
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d',
    }),
  ],
});

if (config?.nod_env !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(
        label({ label: 'UMS' }),
        timestamp(),
        myFormat,
        // prettyPrint(),
      ),
    }),
  );
}

export { logger, errorLogger };
