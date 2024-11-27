import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { createLogger, generateKey } from "./utils.ts";

// Decrypt gibberish image back to original image format
export const decryptImage = async (
	inputPath: string,
	outputPath: string,
	password: string,
) => {
	const logger = createLogger("encrypt");

	// Resolve absolute paths
	const resolvedInputPath = path.resolve(inputPath);
	const resolvedOutputPath = path.resolve(outputPath);

	// Verify if the input file exists and is a valid gibberish image
	if (!fs.existsSync(resolvedInputPath)) {
		throw new Error(`Input file not found: ${resolvedInputPath}`);
	}

	const encryptedBuffer = await fs.promises.readFile(resolvedInputPath);

	// Check if the file has sufficient data (IV + encrypted content)
	if (encryptedBuffer.length < 16) {
		throw new Error("The encrypted file is too short to contain valid data.");
	}

	// Extract IV from the encrypted file
	const iv = encryptedBuffer.slice(0, 16); // Extract the IV
	const encryptedData = encryptedBuffer.slice(16);

	// Verify that the data can be decrypted (valid image after decryption)
	try {
		// Try to decrypt the data with the key
		const key = generateKey(password, logger);
		const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

		const decrypted = Buffer.concat([
			decipher.update(encryptedData),
			decipher.final(),
		]);

		// Ensure decrypted content is a valid image
		await sharp(decrypted).metadata(); // Throws error if not a valid image

		// Ensure the output directory exists
		const outputDir = path.dirname(resolvedOutputPath);
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
		}

		// Write the decrypted image to the output path
		await sharp(decrypted).toFile(resolvedOutputPath);
		// console.log(`Decrypted image saved as ${resolvedOutputPath}`);
		logger.info(`Decrypted image saved as ${resolvedOutputPath}`);
	} catch (_) {
		throw new Error("Failed to decrypt image or invalid decryption.");
	}
};
