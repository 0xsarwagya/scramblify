#!/usr/bin/env node --no-warnings

import yargs from "yargs";
import type { ArgumentsCamelCase } from "yargs";
import { hideBin } from "yargs/helpers";
import { encryptImage } from "./index.ts";
import { decryptImage } from "./index.ts";
import { createLogger } from "./lib/utils.ts";

const cliLogger = createLogger("cli");

type EncryptArguments = {
	input: string;
	output: string;
	password: string;
};

type DecryptArguments = {
	input: string;
	output: string;
	password: string;
};

// Define CLI commands
yargs(hideBin(process.argv))
	.scriptName("scramblify")
	.usage("$0 <cmd> [args]")
	.command(
		"encrypt --input <input> --output <output> --password <password>",
		"Encrypt an image file into a gibberish image",
		(yargs) => {
			yargs
				.option("input", {
					describe: "Path to the input image",
					type: "string",
					demandOption: true,
				})
				.option("output", {
					describe: "Path to save the encrypted image",
					type: "string",
					demandOption: true,
				})
				.option("password", {
					describe: "Password for encryption",
					type: "string",
					demandOption: true,
				});
		},
		async (argv) => {
			try {
				const argument = argv as ArgumentsCamelCase<EncryptArguments>;
				await encryptImage(argument.input, argument.output, argument.password);

				cliLogger.info("Encryption successful");
			} catch (error) {
				cliLogger.error(
					`Error: ${error instanceof Error ? error.message : error}`,
				);
			}
		},
	)
	.command(
		"decrypt --input <input> --output <output> --password <password>",
		"Decrypt a gibberish image back to the original format",
		(yargs) => {
			yargs
				.option("input", {
					describe: "Path to the encrypted image",
					type: "string",
					demandOption: true,
				})
				.option("output", {
					describe: "Path to save the decrypted image",
					type: "string",
					demandOption: true,
				})
				.option("password", {
					describe: "Password for decryption",
					type: "string",
					demandOption: true,
				});
		},
		async (argv) => {
			try {
				const argument = argv as ArgumentsCamelCase<DecryptArguments>;

				await decryptImage(argument.input, argument.output, argument.password);

				cliLogger.info("Decryption successful");
			} catch (error) {
				cliLogger.error(
					`Error: ${error instanceof Error ? error.message : error}`,
				);
			}
		},
	)
	.help()
	.alias("help", "h")
	.demandCommand(1, "You need to specify a command to run.")
	.strict()
	.wrap(null).argv;
