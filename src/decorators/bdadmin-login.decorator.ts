import {
	BDADMIN_LOGIN_METADATA,
	type BdAdminLoginOptions,
} from "../interfaces/bdadmin-metadata.interface";

/**
 * A method decorator that marks the target method as a BDADMIN Login handler.
 *
 * This decorator attaches metadata to methods responsible for user login operations.
 * It is used to define the endpoint, data type, and related configurations required
 * to handle authentication flows dynamically.
 *
 * **Key Points:**
 * 1. Ensure that the decorated login method correctly returns `access_token` and `refresh_token`.
 * 2. Import `reflect-metadata` at the top level of your application to enable metadata storage.
 * 3. Enable `emitDecoratorMetadata` and `experimentalDecorators` in your `tsconfig.json`.
 *
 * **Options:**
 * - `type` (Function | [Function]): Specifies the input or output data type(s) associated with the login handler.
 * - `endpoint` (BdAdminEndpointType): Defines the API endpoint for the login process, including URL and HTTP method.
 *
 * **Usage Example:**
 * ```typescript
 * import { BdAdminLogin } from '@bdadmin/nestjs';
 * import { LoginDto } from './dto/login.dto';
 *
 * class AuthController {
 *   @BdAdminLogin({
 *     type: LoginDto,
 *     endpoint: { url: '/auth/login', method: 'POST' },
 *   })
 *   login() {
 *     // Authentication logic
 *   }
 * }
 * ```
 *
 * **Behavior:**
 * - Metadata is stored on the target method using `Reflect.defineMetadata`.
 * - The metadata can be used at runtime to dynamically configure login endpoints or generate API documentation.
 *
 * @param options - Configuration options for the login handler, such as endpoint details and data types.
 * @returns A MethodDecorator function that attaches BDADMIN Login metadata to the target method.
 */
export function BdAdminLogin(options: BdAdminLoginOptions): MethodDecorator {
	return (target, propertyKey, descriptor) => {
		Reflect.defineMetadata(
			BDADMIN_LOGIN_METADATA,
			options,
			target,
			propertyKey,
		);
		return descriptor;
	};
}
