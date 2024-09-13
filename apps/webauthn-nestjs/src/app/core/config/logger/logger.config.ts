import * as winston from 'winston';
import 'winston-daily-rotate-file';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { logginModuleConfig } from '../../environment/logger';
 
const listLoggerConfig = logginModuleConfig.listLoggerConfig.map((config) => {
  return new winston.transports.DailyRotateFile({ ...config });
});

const loggerConsole = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.errors({ stacks: true }),
    nestWinstonModuleUtilities.format.nestLike(logginModuleConfig.appName, {
      colors: true,
      prettyPrint: true,
    })
  ),
});

const transports = [loggerConsole, ...listLoggerConfig];

export const loggerConfig = {
  logger: WinstonModule.createLogger({
    exitOnError: false,
    format: winston.format.combine(
      winston.format.timestamp({ format: logginModuleConfig.format }),
      winston.format.json()
    ),
    transports,
  }),
};
