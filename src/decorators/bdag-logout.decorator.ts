import {
	BDAG_LOGOUT_METADATA,
	type BdagLogoutOptions,
} from "../interfaces/bdag-metadata.interface";

/**
 * A method decorator that marks the target method as a BDAG Logout handler.
 *
 * This decorator attaches metadata to methods responsible for handling user logout processes.
 * It allows configuration of logout endpoints and related strategies, such as token invalidation
 * or session cleanup. The metadata can be dynamically accessed during runtime to configure these processes.
 *
 * **Key Points:**
 * 1. Ensure that the backend properly handles `refresh_token` invalidation during logout.
 * 2. Import `reflect-metadata` at the top level of your application to enable metadata storage.
 * 3. Enable `emitDecoratorMetadata` and `experimentalDecorators` in your `tsconfig.json`.
 *
 * **Options:**
 * - `endpoint` (BdagEndpointType): Defines the API endpoint for the logout process, including URL and HTTP method.
 *
 * **Usage Example:**
 * ```typescript
 * import { BdagLogout } from '@bdag/nestjs';
 *
 * class AuthController {
 *   @BdagLogout({
 *     endpoint: { url: '/auth/logout', method: 'POST' },
 *   })
 *   logout() {
 *     // Logout logic
 *   }
 * }
 * ```
 *
 * **Behavior:**
 * - Metadata is stored on the target method using `Reflect.defineMetadata`.
 * - The metadata can be used at runtime to dynamically configure logout endpoints or integrate with authentication flows.
 *
 * @param options - Configuration options for the logout handler, including endpoint details.
 * @returns A MethodDecorator function that attaches BDAG Logout metadata to the target method.
 */
export function BdagLogout(options: BdagLogoutOptions): MethodDecorator {
	return (target, propertyKey, descriptor) => {
		Reflect.defineMetadata(BDAG_LOGOUT_METADATA, options, target, propertyKey);
		return descriptor;
	};
}
