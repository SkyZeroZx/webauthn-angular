import { env } from 'process';
import { config } from 'dotenv';
import { LoggingModuleConfig } from './logger.interface';
import { LOGGER_LEVEL } from './logger-level.enum';

config();

export const logginModuleConfig: LoggingModuleConfig = {
	format: env.LOGGER_FORMAT,
	appName: env.LOGGER_APP_NAME,
	listLoggerConfig: [
		{
			filename: `${env.LOG_FOLDER}/${env.LOGGER_FILENAME_INFO}`,
			datePattern: env.LOGGER_DATE_PATTERN,
			zippedArchive: JSON.parse(env.LOGGER_ZIPPED_ARCHIVE),
			watchLog: JSON.parse(env.LOGGER_WATCH_LOG),
			maxSize: env.LOGGER_MAX_SIZE,
			maxFiles: env.LOGGER_MAX_FILES,
			level: LOGGER_LEVEL.INFO
		},
		{
			filename: `${env.LOG_FOLDER}/${env.LOGGER_FILENAME_WARN}`,
			datePattern: env.LOGGER_DATE_PATTERN,
			zippedArchive: JSON.parse(env.LOGGER_ZIPPED_ARCHIVE),
			watchLog: JSON.parse(env.LOGGER_WATCH_LOG),
			maxSize: env.LOGGER_MAX_SIZE,
			maxFiles: env.LOGGER_MAX_FILES,
			level: LOGGER_LEVEL.WARN
		},
		{
			filename: `${env.LOG_FOLDER}/${env.LOGGER_FILENAME_ERROR}`,
			datePattern: env.LOGGER_DATE_PATTERN,
			zippedArchive: JSON.parse(env.LOGGER_ZIPPED_ARCHIVE),
			watchLog: JSON.parse(env.LOGGER_WATCH_LOG),
			maxSize: env.LOGGER_MAX_SIZE,
			maxFiles: env.LOGGER_MAX_FILES,
			level: LOGGER_LEVEL.ERROR
		}
	]
};
