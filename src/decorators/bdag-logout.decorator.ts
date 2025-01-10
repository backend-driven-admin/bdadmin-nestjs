import "reflect-metadata";
import {
	BDAG_LOGOUT_METADATA,
	type BdagLogoutOptions,
} from "../interfaces/bdag-metadata.interface";

/**
 * A class decorator that marks the target class as a BDAG Logout handler.
 *
 * The decorator stores logout-related metadata using `Reflect.defineMetadata`.
 * This metadata can later be used to configure logout processes in the application.
 *
 * **Important:**
 * 1. Ensure that your backend generates a `refresh_token` during the logout process.
 * 2. Confirm that `reflect-metadata` is imported at the top level of your application.
 * 3. Ensure that `emitDecoratorMetadata` and `experimentalDecorators` are enabled in your `tsconfig.json`.
 *
 * @param options - The logout configuration options (e.g., token invalidation strategies, cleanup procedures, etc.)
 * @returns A ClassDecorator function that attaches BDAG Logout metadata to the target class.
 */
export function BdagLogout(options: BdagLogoutOptions): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(BDAG_LOGOUT_METADATA, options, target);
	};
}
