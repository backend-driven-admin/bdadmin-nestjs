// rollup.config.mjs
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import terser from "@rollup/plugin-terser";
import { dts } from "rollup-plugin-dts";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";

const packageJson = require("./package.json");

// Define Rollup configuration for bundling the package
export default defineConfig([
	{
		// Main library bundle configuration
		input: "src/index.ts",
		external: ["reflect-metadata"],
		output: {
			file: packageJson.main, // Output file path from package.json "main" field
			format: "cjs", // Output format: CommonJS
		},
		plugins: [
			json(), // Ora package required
			resolve(), // Locate and bundle third-party dependencies in node_modules
			commonjs(), // Convert CommonJS modules to ES6 for Rollup to process
			typescript({
				outputToFilesystem: true, // Emit compiled files to the filesystem
			}),
			copy({
				targets: [
					{
						src: "src/templates",
						dest: "dist",
					},
				],
			}), // Copy file templates
			terser(), // Minify the output bundle
		],
	},
	{
		// Separate bundle configuration for the CLI entry point
		input: "src/cli/index.ts",
		external: ["reflect-metadata"],
		output: {
			file: packageJson.bin[packageJson.name], // Output path from package.json "bin" field
			format: "cjs", // Output format: CommonJS
			banner: "#!/usr/bin/env node", // Shebang to ensure Node executes the CLI correctly
		},
		plugins: [
			json(), // Ora package required
			resolve(), // Locate and bundle dependencies
			commonjs(), // Convert CommonJS modules to ES6
			typescript(), // Compile TypeScript files
			terser(), // Minify the output bundle
		],
	},
	{
		// Configuration for generating TypeScript declaration files (.d.ts)
		input: "src/index.ts",
		output: [
			{
				file: packageJson.types, // Output path for the bundled type definitions
				format: "es", // Use ES module format for type declarations
			},
		],
		plugins: [
			dts(), // Plugin to generate .d.ts files
		],
	},
]);
