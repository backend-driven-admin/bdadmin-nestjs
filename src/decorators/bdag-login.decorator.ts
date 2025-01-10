import "reflect-metadata";
import {
	BDAG_LOGIN_METADATA,
	type BdagLoginOptions,
} from "../interfaces/bdag-metadata.interface";

/**
 * A class decorator that marks the target class as a BDAG Login handler.
 *
 * The decorator stores login-related metadata using `Reflect.defineMetadata`.
 * This metadata can later be used, for instance, to configure authentication flows.
 *
 * **Important:**
 * 1. Ensure that the decorated login method returns both `access_token` and `refresh_token`.
 * 2. Confirm that `reflect-metadata` is imported at the top level of your application.
 * 3. Ensure that `emitDecoratorMetadata` and `experimentalDecorators` are enabled in your `tsconfig.json`.
 *
 * @param options - The login configuration options (e.g., token expiration times, user roles, etc.)
 * @returns A ClassDecorator function that attaches BDAG Login metadata to the target class.
 */
export function BdagLogin(options: BdagLoginOptions): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(BDAG_LOGIN_METADATA, options, target);
	};
}
