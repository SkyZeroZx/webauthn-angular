import { LOGGER_LEVEL } from "./logger-level.enum";

export interface LoggerConfig {
	filename: string;
	datePattern: string;
	zippedArchive: boolean;
	watchLog: boolean;
	maxSize: number | string;
	maxFiles: number | string;
	level: LOGGER_LEVEL;
}

export interface LoggingModuleConfig {
	format: string;
	appName: string;
	listLoggerConfig: LoggerConfig[];
}
