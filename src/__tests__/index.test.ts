import path from "node:path";
import fs from "node:fs/promises";
import { decryptImage, encryptImage } from "../index.ts";
import { test } from "node:test";
import assert from "node:assert/strict";

// Utility function to create temporary files and directories for testing
const setupTestEnv = async () => {
	const tempDir = path.resolve("test-temp");
	await fs.mkdir(tempDir, { recursive: true });

	const testImagePath = path.join(tempDir, "test.png");
	const scrambledPath = path.join(tempDir, "test.scrambled");
	const restoredPath = path.join(tempDir, "test-restored.png");

	// Copy ./.github/assets/icon.png to tempDir
	const originalImagePath = path.resolve(".github/assets/icon.png");
	await fs.copyFile(originalImagePath, testImagePath);

	return { tempDir, testImagePath, scrambledPath, restoredPath };
};

// Utility to clean up temporary files
const cleanupTestEnv = async (tempDir: string) => {
	await fs.rm(tempDir, { recursive: true, force: true });
};

const testPassword = "test-password";

test("encryptImage function should successfully encrypt an image", async () => {
	const { tempDir, testImagePath, scrambledPath } = await setupTestEnv();

	try {
		// Act: Encrypt the image
		await encryptImage(testImagePath, scrambledPath, testPassword);

		// Assert: Ensure the scrambled file exists
		const scrambledExists = await fs
			.stat(scrambledPath)
			.then(() => true)
			.catch(() => false);
		assert.strictEqual(scrambledExists, true, "Scrambled file should exist");

		// Assert: Check that the scrambled file is not the same as the original
		const originalBuffer = await fs.readFile(testImagePath);
		const scrambledBuffer = await fs.readFile(scrambledPath);
		assert.notDeepStrictEqual(
			scrambledBuffer,
			originalBuffer,
			"Scrambled file should differ from the original",
		);
	} finally {
		await cleanupTestEnv(tempDir);
	}
});

test("decryptImage function should successfully decrypt an image", async () => {
	const { tempDir, testImagePath, scrambledPath, restoredPath } =
		await setupTestEnv();

	try {
		// Arrange: Encrypt the image first
		await encryptImage(testImagePath, scrambledPath, testPassword);

		// Act: Decrypt the scrambled image
		await decryptImage(scrambledPath, restoredPath, testPassword);

		// Assert: Ensure the restored file exists
		const restoredExists = await fs
			.stat(restoredPath)
			.then(() => true)
			.catch(() => false);
		assert.strictEqual(restoredExists, true, "Restored file should exist");

		const decryptedImage = await fs.readFile(restoredPath);
		assert.strictEqual(
			decryptedImage.length > 0,
			true,
			"Restored file should not be empty",
		);
	} finally {
		await cleanupTestEnv(tempDir);
	}
});

test("decryptImage should throw an error with an incorrect password", async () => {
	const { tempDir, testImagePath, scrambledPath, restoredPath } =
		await setupTestEnv();

	try {
		// Arrange: Encrypt the image
		await encryptImage(testImagePath, scrambledPath, testPassword);

		// Act & Assert: Attempt to decrypt with a wrong password
		await assert.rejects(
			async () => {
				await decryptImage(scrambledPath, restoredPath, "wrong-password");
			},
			// biome-ignore lint/performance/useTopLevelRegex: <explanation>
			/Failed to decrypt image or invalid decryption/,
			"Should throw an error for incorrect password",
		);
	} finally {
		await cleanupTestEnv(tempDir);
	}
});
