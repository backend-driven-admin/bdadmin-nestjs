import "reflect-metadata";
import {
	BDAG_ENTITY_METADATA,
	type BdagEntityOptions,
} from "../interfaces/bdag-metadata.interface";

/**
 * A class decorator that marks the target class as a BDAG Entity.
 *
 * The decorator stores metadata (entity options) using `Reflect.defineMetadata`,
 * which can be retrieved later (e.g., in an administrative panel generator).
 *
 * **Important:**
 * 1. Ensure that `reflect-metadata` is imported at the top level of your application.
 * 2. Confirm that `emitDecoratorMetadata` and `experimentalDecorators` are enabled in your `tsconfig.json`.
 *
 * @param options - The entity configuration options (e.g., database table name, validation rules, etc.)
 * @returns A ClassDecorator function that attaches BDAG Entity metadata to the target class.
 */
export function BdagEntity(options: BdagEntityOptions): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(BDAG_ENTITY_METADATA, options, target);
	};
}
