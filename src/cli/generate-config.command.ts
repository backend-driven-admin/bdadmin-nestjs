import { writeFileSync } from "node:fs";
import "reflect-metadata";
import {
	BDAG_DTO_METADATA,
	BDAG_ENTITY_METADATA,
	BDAG_VALIDATIONS_METADATA,
	BDAG_LOGIN_METADATA,
	BDAG_LOGOUT_METADATA,
	type BdagDtoOptions,
	type BdagEntityOptions,
	type BdagValidationOptions,
	BDAG_FIELDS_METADATA,
	type BdagFieldOptions,
	type BdagLoginOptions,
	type BdagLogoutOptions,
	BDAG_REFRESH_METADATA,
	type BdagRefreshOptions,
} from "../interfaces/bdag-metadata.interface";

/**
 * Describes the overall configuration structure produced by `generateBdagConfig()`.
 * It contains:
 * - A list of entities (with their respective fields).
 * - A list of DTOs (with their validation fields).
 * - Authentication-related configurations (login, logout, refresh).
 */
interface ConfigType {
	entities: Array<
		BdagEntityOptions & {
		fields: Array<BdagFieldOptions & { key: string }>;
	}
	>;
	dtos: Array<
		BdagDtoOptions & {
		fields: Array<BdagValidationOptions & { key: string }>;
	}
	>;
	auth: {
		login?: BdagLoginOptions & { fields: Array<BdagValidationOptions> };
		logout?: BdagLogoutOptions & { refreshKey?: string };
		refresh?: BdagRefreshOptions;
	};
}

/**
 * Generates a BDAG configuration object based on a list of classes decorated with BDAG-specific metadata.
 *
 * This function inspects each class in `classes` for the presence of custom decorators:
 * - `@BdagEntity` for entities
 * - `@BdagDto` for DTOs
 * - `@BdagLogin` for login-related DTOs
 * - `@BdagLogout` for logout-related DTOs
 * - `@BdagRefresh` for token-refresh-related DTOs
 *
 * **Important:**
 * 1. Make sure `reflect-metadata` is imported at the top level of your application.
 * 2. Make sure the classes passed to this function are compiled JavaScript classes (with decorators).
 * 3. Ensure that `emitDecoratorMetadata` and `experimentalDecorators` are enabled in your `tsconfig.json`.
 *
 * @param classes - An array of classes decorated with BDAG decorators.
 * @returns A `ConfigType` object containing entity definitions, DTO definitions, and auth endpoints.
 * @throws Will exit the process if any of `login`, `logout`, or `refresh` configs are missing.
 */
export function generateBdagConfig(classes: Function[]): ConfigType {
	const config: ConfigType = {
		entities: [],
		dtos: [],
		auth: {},
	};

	for (const cls of classes) {
		// @BdagEntity(...)
		const entityMeta: BdagEntityOptions | undefined = Reflect.getMetadata(
			BDAG_ENTITY_METADATA,
			cls,
		);
		if (entityMeta) {
			const fields: Array<BdagFieldOptions & { key: string }> =
				Reflect.getMetadata(BDAG_FIELDS_METADATA, cls) || [];

			config.entities.push({
				...entityMeta, // { key, endpoint, roles? }
				fields: fields.map((f) => ({
					key: f.key,
					type: f.type,
					sort: f.sort,
					search: f.search,
				})),
			});
		}

		// @BdagDto(...)
		const dtoMeta: BdagDtoOptions | undefined = Reflect.getMetadata(
			BDAG_DTO_METADATA,
			cls,
		);
		if (dtoMeta) {
			const fields: Array<BdagValidationOptions & { key: string }> =
				Reflect.getMetadata(BDAG_VALIDATIONS_METADATA, cls) || [];

			config.dtos.push({
				action: dtoMeta.action, // { type, endpoint }
				entityKey: dtoMeta.entityKey,
				roles: dtoMeta.roles || [],
				fields: fields.map((f) => ({
					key: f.key,
					type: f.type,
					min: f.min,
					max: f.max,
					required: f.required,
					unique: f.unique,
					hidden: f.hidden,
					disabled: f.disabled,
					defaultValue: f.defaultValue,
					regex: f.regex?.toString(),
					dataSource: f.dataSource,
				})),
			});
		}

		// @BdagLogin(...)
		const loginDtoMeta: BdagLoginOptions | undefined = Reflect.getMetadata(
			BDAG_LOGIN_METADATA,
			cls,
		);
		if (loginDtoMeta) {
			const fields: Array<BdagValidationOptions & { key: string }> =
				Reflect.getMetadata(BDAG_VALIDATIONS_METADATA, cls) || [];

			config.auth.login = {
				endpoint: loginDtoMeta.endpoint,
				response: loginDtoMeta.response,
				fields: fields.map((f) => ({
					key: f.key,
					type: f.type,
					min: f.min,
					max: f.max,
					required: f.required,
					unique: f.unique,
					hidden: f.hidden,
					disabled: f.disabled,
					defaultValue: f.defaultValue,
					regex: f.regex?.toString(),
					dataSource: f.dataSource,
				})),
			};
		}

		// @BdagLogout(...)
		const logoutDtoMeta: BdagLogoutOptions | undefined = Reflect.getMetadata(
			BDAG_LOGOUT_METADATA,
			cls,
		);
		if (logoutDtoMeta) {
			const fields: Array<BdagValidationOptions & { key: string }> =
				Reflect.getMetadata(BDAG_VALIDATIONS_METADATA, cls) || [];

			config.auth.logout = {
				endpoint: logoutDtoMeta.endpoint,
				refreshKey: fields.find((field) => field.type === "token")?.key,
			};
		}

		// @BdagRefresh(...)
		const refreshDtoMeta: BdagRefreshOptions | undefined = Reflect.getMetadata(
			BDAG_REFRESH_METADATA,
			cls,
		);
		if (refreshDtoMeta) {
			config.auth.refresh = {
				endpoint: refreshDtoMeta.endpoint,
				response: refreshDtoMeta.response,
			};
		}
	}

	// If any of the required authentication endpoints is missing, exit the process.
	if (!config.auth.login || !config.auth.refresh || !config.auth.logout) {
		console.error("Authentication is not fully configured. Please refer to the documentation.");
		process.exit(1);
	}

	return config;
}

/**
 * Generates a BDAG configuration file by reading BDAG-decorated classes and
 * writing the resulting config to a JSON file.
 *
 * @param classes - An array of classes decorated with BDAG metadata.
 * @param outputPath - Path to the JSON file where the config will be saved.
 */
export function generateBdagConfigFile(
	classes: Function[],
	outputPath: string,
) {
	const config = generateBdagConfig(classes);
	const jsonStr = JSON.stringify(config, null, 2);
	writeFileSync(outputPath, jsonStr, "utf-8");
	console.log(`BDAG config has been generated: ${outputPath}`);
}
