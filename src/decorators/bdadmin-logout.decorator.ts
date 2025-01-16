import {
	BDADMIN_LOGOUT_METADATA,
	type BdAdminLogoutOptions,
} from "../interfaces/bdadmin-metadata.interface";

/**
 * A method decorator that marks the target method as a BDADMIN Logout handler.
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
 * - `endpoint` (BdAdminEndpointType): Defines the API endpoint for the logout process, including URL and HTTP method.
 *
 * **Usage Example:**
 * ```typescript
 * import { BdAdminLogout } from '@bdadmin/nestjs';
 *
 * class AuthController {
 *   @BdAdminLogout({
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
 * @returns A MethodDecorator function that attaches BDADMIN Logout metadata to the target method.
 */
export function BdAdminLogout(options: BdAdminLogoutOptions): MethodDecorator {
	return (target, propertyKey, descriptor) => {
		Reflect.defineMetadata(
			BDADMIN_LOGOUT_METADATA,
			options,
			target,
			propertyKey,
		);
		return descriptor;
	};
}
