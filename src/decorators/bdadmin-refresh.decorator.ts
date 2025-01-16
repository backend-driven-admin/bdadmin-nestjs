import {
	BDADMIN_REFRESH_METADATA,
	type BdAdminRefreshOptions,
} from "../interfaces/bdadmin-metadata.interface";

/**
 * A method decorator that marks the target method as a BDADMIN Refresh handler.
 *
 * This decorator attaches metadata to methods responsible for handling token refresh operations.
 * It allows configuration of refresh endpoints and related strategies, such as token rotation policies
 * or handling token expiration. The metadata can be dynamically accessed during runtime to configure these processes.
 *
 * **Key Points:**
 * 1. Ensure that the backend properly generates and handles `refresh_token` values.
 * 2. Import `reflect-metadata` at the top level of your application to enable metadata storage.
 * 3. Enable `emitDecoratorMetadata` and `experimentalDecorators` in your `tsconfig.json`.
 *
 * **Options:**
 * - `endpoint` (BdAdminEndpointType): Defines the API endpoint for the refresh process, including URL and HTTP method.
 *
 * **Usage Example:**
 * ```typescript
 * import { BdAdminRefresh } from '@bdadmin/nestjs';
 *
 * class AuthController {
 *   @BdAdminRefresh({
 *     endpoint: { url: '/auth/refresh', method: 'POST' },
 *   })
 *   refreshToken() {
 *     // Refresh token logic
 *   }
 * }
 * ```
 *
 * **Behavior:**
 * - Metadata is stored on the target method using `Reflect.defineMetadata`.
 * - The metadata can be used at runtime to dynamically configure token refresh endpoints or integrate with authentication flows.
 *
 * @param options - Configuration options for the refresh handler, including endpoint details.
 * @returns A MethodDecorator function that attaches BDADMIN Refresh metadata to the target method.
 */
export function BdAdminRefresh(
	options: BdAdminRefreshOptions,
): MethodDecorator {
	return (target, propertyKey, descriptor) => {
		Reflect.defineMetadata(
			BDADMIN_REFRESH_METADATA,
			options,
			target,
			propertyKey,
		);
		return descriptor;
	};
}
