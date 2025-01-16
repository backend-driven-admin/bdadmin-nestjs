import {
	BDADMIN_AUTH_METADATA,
	type BdAdminAuthOptions,
} from "../interfaces/bdadmin-metadata.interface";

/**
 * A class decorator that marks the target class as a BDADMIN Authentication handler.
 *
 * This decorator is used to attach authentication-related metadata, including access and refresh token keys,
 * to a target class. This metadata can later be utilized to configure authentication flows or middleware.
 *
 * **Key Points:**
 * 1. Ensure that the decorated login method properly handles both `access_token` and `refresh_token`.
 * 2. Import `reflect-metadata` at the top level of your application for metadata storage to function correctly.
 * 3. Enable the `emitDecoratorMetadata` and `experimentalDecorators` flags in your `tsconfig.json`.
 *
 * **Options:**
 * - `accessKey` (string): The key used for storing the access token in the response payload.
 * - `refreshKey` (string): The key used for storing the refresh token in the response payload.
 *
 * **Usage Example:**
 * ```typescript
 * import { BdAdminAuth } from '@bdadmin/nestjs';
 *
 * @BdAdminAuth({
 *   accessKey: 'access_token',
 *   refreshKey: 'refresh_token',
 * })
 * export class AuthController {
 *   // Implementation of authentication logic
 * }
 * ```
 *
 * @param options - Configuration options for the authentication handler, including token keys.
 * @returns A ClassDecorator function that attaches BDADMIN Authentication metadata to the target class.
 */
export function BdAdminAuth(options: BdAdminAuthOptions): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(BDADMIN_AUTH_METADATA, options, target);
	};
}
