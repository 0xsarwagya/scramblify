import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { createLogger, generateKey, isValidImage } from "./utils.ts";

export const encryptImage = async (
	inputPath: string,
	outputPath: string,
	password: string,
) => {
	// logger = createLogger("encrypt");
	const logger = createLogger("encrypt");

	// Resolve absolute paths
	const resolvedInputPath = path.resolve(inputPath);
	const resolvedOutputPath = path.resolve(outputPath);

	// Verify if the input file exists and is a valid image
	if (!fs.existsSync(resolvedInputPath)) {
		throw new Error(`Input file not found: ${resolvedInputPath}`);
	}

	if (!(await isValidImage(resolvedInputPath, logger))) {
		throw new Error(`Input file is not a valid image: ${resolvedInputPath}`);
	}

	// Ensure the output directory exists, create it if it doesn't
	const outputDir = path.dirname(resolvedOutputPath);
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	// Generate encryption key and IV
	const key = generateKey(password, logger);
	const iv = crypto.randomBytes(16); // Generate a secure random IV

	const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

	// Read and encrypt the image
	const imageBuffer = await sharp(resolvedInputPath).toBuffer();
	const encrypted = Buffer.concat([
		iv,
		cipher.update(imageBuffer),
		cipher.final(),
	]);

	// Write the encrypted (gibberish) image to the output path
	await fs.promises.writeFile(resolvedOutputPath, encrypted);
	logger.info(`Encrypted image saved to: ${resolvedOutputPath}`);
};
