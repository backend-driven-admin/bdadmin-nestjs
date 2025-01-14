import {
	BDAG_BEHAVIOR_METADATA,
	type BdagBehaviorOptions,
} from "../interfaces/bdag-metadata.interface";

/**
 * A method decorator that marks the target method as a BDAG behavior.
 *
 * This decorator is used to define and attach metadata to methods representing specific behaviors,
 * such as REST API actions (e.g., `GET`, `POST`, `PUT`) linked to entities or data types. These behaviors
 * can be dynamically processed to generate administrative configurations or handle API operations.
 *
 * **Key Points:**
 * 1. Ensure that `reflect-metadata` is imported at the top level of your application.
 * 2. Enable `emitDecoratorMetadata` and `experimentalDecorators` in your `tsconfig.json`.
 * 3. Use this decorator to specify HTTP methods and associated data types for API behaviors.
 *
 * **Options:**
 * - `type` (Function | [Function]): Specifies the data type(s) related to the behavior, such as input or output types.
 * - `method` (BdagMethodType): Defines the HTTP method (e.g., `GET`, `POST`, etc.) for the behavior.
 *
 * **Usage Example:**
 * ```typescript
 * import { BdagBehavior } from '@bdag/nestjs';
 * import { User } from './user.entity';
 *
 * class UserController {
 *   @BdagBehavior({ type: [User], endpoint: { url: "/users", method: "GET" } })
 *   getAll() {
 *     // Logic for fetching a users
 *   }
 * }
 * ```
 *
 * **Behavior:**
 * - Metadata is stored on the target method using `Reflect.defineMetadata`.
 * - The metadata can be retrieved during runtime to configure dynamic behaviors or generate administrative tools.
 *
 * @param options - Configuration options for the behavior, including HTTP method and data type.
 * @returns A MethodDecorator function that attaches the behavior metadata to the target method.
 */
export function BdagBehavior(options: BdagBehaviorOptions): MethodDecorator {
	return (target, propertyKey, descriptor) => {
		Reflect.defineMetadata(
			BDAG_BEHAVIOR_METADATA,
			options,
			target,
			propertyKey,
		);
		return descriptor;
	};
}
