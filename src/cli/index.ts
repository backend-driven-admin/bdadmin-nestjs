import { Command } from "commander";
import { join } from "node:path";
import { generateBdagConfigFile } from "./generate-config.command";
import { globSync } from "glob";
import { pathToFileURL } from "node:url";

/**
 * BDAG NestJS CLI
 *
 * This CLI tool scans the compiled JavaScript files in the `dist/` directory
 * to find classes decorated with BDAG-specific metadata (entities, DTOs, login/logout, etc.).
 * It then aggregates these classes and generates a BDAG configuration JSON file.
 *
 * Usage Example:
 *   npx bdag-nestjs generate --output bdag.config.json
 *
 * Steps:
 * 1. Use `globSync` to locate all `.js` files in the `dist/` directory (ignoring `dist/main.js`).
 * 2. Dynamically import each file, collecting any exported functions (classes) or objects containing functions.
 * 3. Pass these collected classes to `generateBdagConfigFile` which processes metadata and writes the config.
 */

const program = new Command();

program
	.name("@bdag/nestjs")
	.description("BDAG NestJS CLI")
	.version("1.0.0");

/**
 * The "generate" command:
 *  - Searches for all `.js` files under `dist/`.
 *  - Dynamically imports each file, gathering classes.
 *  - Generates a JSON configuration file with BDAG metadata.
 */
program
	.command("generate")
	.description("Generate BDAG config in the current NestJS project")
	.option("-o, --output <path>", "Output file path", "bdag.config.json")
	.action(async (opts) => {
		try {
			// 1) Find all compiled *.js files, ignoring dist/main.js
			const jsFiles = globSync("dist/**/*.js", {
				cwd: process.cwd(),
				absolute: true,
				ignore: ["dist/main.js"],
			});

			// 2) Dynamically import the files and collect exported classes/functions
			const classes: Function[] = [];
			for (const filePath of jsFiles) {
				const fileUrl = pathToFileURL(filePath).href;
				const mod = await import(fileUrl);

				for (const exp of Object.values(mod)) {
					// If the export is a function (commonly a class)
					if (typeof exp === "function") {
						classes.push(exp);
					}
					// Or if the export is an object containing one or more functions
					else if (
						typeof exp === "object" &&
						exp !== null &&
						Object.values(exp).some((val) => typeof val === "function")
					) {
						for (const val of Object.values(exp)) {
							if (typeof val === "function") {
								classes.push(val);
							}
						}
					}
				}
			}

			// 3) Generate and write the BDAG config file
			const outputPath = join(process.cwd(), opts.output);
			generateBdagConfigFile(classes, outputPath);
		} catch (err) {
			console.error("Error while generating BDAG config:", err);
			process.exit(1);
		}
	});

program.parse(process.argv);
