import { Command } from "commander";
import { generateBdAdminConfigFile } from "./generate-config.command";
import { globSync } from "glob";
import { pathToFileURL } from "node:url";
import {
	BDADMIN_AUTH_METADATA,
	BDADMIN_BEHAVIOR_METADATA,
	BDADMIN_ENTITY_METADATA,
} from "../interfaces/bdadmin-metadata.interface";
import ora from "ora";

const program = new Command();

program
	.name("@bdadmin/nestjs")
	.description("BDADMIN NestJS CLI")
	.version("1.0.1");

/**
 * Command: generate
 *
 * This command scans a NestJS project for classes with BDADMIN-related metadata
 * (e.g., entities, behaviors, or authentication configurations) and generates a BDADMIN configuration file.
 */
program
	.command("generate")
	.description("Generate BDADMIN config in the current NestJS project")
	.option("-l --local", "Generate only the config file", false)
	.option(
		"-n --name <VALUE>",
		"Name of the directory to place the config",
		"bdadmin",
	)
	.action(async (opts) => {
		const loading = ora("Starting to read files").start();
		try {
			// Step 1: Locate all compiled .js files, excluding dist/main.js
			const jsFiles = globSync("dist/**/*.js", {
				cwd: process.cwd(), // Start from the current working directory
				absolute: true, // Return absolute paths for the files
				ignore: ["dist/main.js"], // Exclude the main entry file
			});

			// Step 2: Dynamically import files and collect relevant classes
			const classes: Function[] = [];
			for (const filePath of jsFiles) {
				const fileUrl = pathToFileURL(filePath).href; // Convert file path to URL for dynamic import
				const mod = await import(fileUrl); // Import the module

				for (const exp of Object.values(mod)) {
					// Check if the export is a class
					if (typeof exp !== "function") continue;

					// Verify if the class has @BdAdminEntity metadata
					const hasEntityMetadata = Reflect.hasMetadata(
						BDADMIN_ENTITY_METADATA,
						exp,
					);
					const hasAuthMetadata = Reflect.hasMetadata(
						BDADMIN_AUTH_METADATA,
						exp,
					);

					// Check if the class contains at least one method with @BdAdminBehavior metadata
					let hasBehavior = false;
					const prototype = exp.prototype;
					if (prototype) {
						const methodNames = Object.getOwnPropertyNames(prototype).filter(
							(name) =>
								name !== "constructor" && typeof prototype[name] === "function",
						);

						for (const methodName of methodNames) {
							if (
								Reflect.hasMetadata(
									BDADMIN_BEHAVIOR_METADATA,
									prototype,
									methodName,
								)
							) {
								hasBehavior = true;
								break;
							}
						}
					}

					// Add the class to the list if it has relevant metadata
					if (hasEntityMetadata || hasAuthMetadata || hasBehavior) {
						classes.push(exp);
					}
				}
			}

			// Step 3: Generate and write the BDADMIN configuration file
			generateBdAdminConfigFile(
				classes,
				loading,
				opts.local as boolean,
				opts.name as string,
			); // Generate the configuration file
		} catch (error) {
			// Handle errors during the process
			loading.fail("Couldn't read files");
			process.exit(1);
		}
	});

program.parse(process.argv); // Parse the command-line arguments
