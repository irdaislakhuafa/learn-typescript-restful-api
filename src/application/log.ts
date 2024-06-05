import { env } from "bun";
import winston from "winston";

export const log = winston.createLogger({
	level: env.LOG_LEVEL,
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({})
	]
});