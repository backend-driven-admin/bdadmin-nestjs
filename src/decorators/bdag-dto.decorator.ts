import "reflect-metadata";
import {
	BDAG_DTO_METADATA,
	type BdagDtoOptions,
} from "../interfaces/bdag-metadata.interface";

/**
 * A class decorator that marks the target class as a BDAG DTO.
 *
 * The decorator stores metadata (DTO options) using `Reflect.defineMetadata`,
 * which can be retrieved later (e.g., in a configuration generator).
 *
 * **Important:**
 * 1. Make sure you have imported `reflect-metadata` at the top level of your application.
 * 2. Ensure `emitDecoratorMetadata` and `experimentalDecorators` are enabled in your `tsconfig.json`.
 *
 * @param options - The DTO configuration options (e.g., endpoint, roles, etc.)
 * @returns A ClassDecorator function that attaches BDAG DTO metadata to the target class.
 */
export function BdagDto(options: BdagDtoOptions): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(BDAG_DTO_METADATA, options, target);
	};
}
