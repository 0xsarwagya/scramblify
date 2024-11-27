import winston, { type Logger } from "winston";
import crypto from "node:crypto";
import sharp from "sharp";

/**
 * Generates a key using the provided password.
 * @param password - The password used to generate the key.
 * @returns The generated key as a Buffer.
 */
export const generateKey = (password: string, logger: Logger): Buffer => {
	logger.info("Generating key...");
	return crypto.createHash("sha256").update(password).digest();
};

/**
 * Checks if the given file path is a valid image.
 * @param filePath - The path of the image file.
 * @param logger - The logger instance for logging messages.
 * @returns A promise that resolves to a boolean indicating whether the file is a valid image or not.
 */
export const isValidImage = async (
	filePath: string,
	logger: Logger,
): Promise<boolean> => {
	try {
		logger.info(`Checking if ${filePath} is a valid image...`);
		await sharp(filePath).metadata();
		logger.info(`${filePath} is a valid image.`);
		return true;
	} catch (_) {
		logger.error(`${filePath} is not a valid image.`);
		return false;
	}
};

/**
 * Creates a logger with the specified label.
 * @param label - The label for the logger.
 * @returns A logger instance.
 */
export const createLogger = (label: string) =>
	winston.createLogger({
		levels: {
			error: 0,
			warn: 1,
			info: 2,
			http: 3,
			verbose: 4,
			debug: 5,
			silly: 6,
		},
		format: winston.format.combine(
			winston.format.label({ label }),
			winston.format.colorize(),
			winston.format.timestamp({
				format: () => {
					return new Date().toLocaleString("en-US");
				},
			}),
			winston.format.align(),
			winston.format.printf(
				(info) =>
					`\x1b[34m(${info.label})\x1b[0m \x1b[33m${info.timestamp}\x1b[0m [${info.level}]: ${info.message}`,
			),
		),
		transports: [new winston.transports.Console()],
	});
