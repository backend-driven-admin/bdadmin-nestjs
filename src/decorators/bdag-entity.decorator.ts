import {
	BDAG_ENTITY_METADATA,
	type BdagEntityOptions,
} from "../interfaces/bdag-metadata.interface";

/**
 * A class decorator that marks the target class as a BDAG Entity.
 *
 * This decorator attaches metadata to the class, designating it as an entity in the BDAG ecosystem.
 * Entities are used for administrative panel generators, configuration tools, and dynamic API handling.
 * The metadata includes a unique name for the entity and can be extended to include additional configuration options.
 *
 * **Key Points:**
 * 1. Ensure that `reflect-metadata` is imported at the top level of your application to support metadata storage.
 * 2. Enable `emitDecoratorMetadata` and `experimentalDecorators` in your `tsconfig.json`.
 * 3. Use this decorator to define entities with unique identifiers, making them accessible for dynamic processing.
 *
 * **Options:**
 * - `name` (string): A unique name identifying the entity.
 *
 * **Usage Example:**
 * ```typescript
 * import { BdagEntity } from '@bdag/nestjs';
 *
 * @BdagEntity({
 *   name: "users"
 * })
 * export class UserController {
 *   // Entity properties and methods
 * }
 * ```
 *
 * **Behavior:**
 * - Metadata is stored on the class constructor using `Reflect.defineMetadata`.
 * - The metadata can be retrieved at runtime to generate dynamic configurations or integrate with external systems.
 *
 * @param options - Configuration options for the entity, including a unique name.
 * @returns A ClassDecorator function that attaches BDAG Entity metadata to the target class.
 */
export function BdagEntity(options: BdagEntityOptions): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(BDAG_ENTITY_METADATA, options, target);
	};
}
