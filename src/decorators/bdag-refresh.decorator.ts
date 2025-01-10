import "reflect-metadata";
import {
	BDAG_REFRESH_METADATA,
	type BdagRefreshOptions,
} from "../interfaces/bdag-metadata.interface";

/**
 * A class decorator that marks the target class as a BDAG Refresh handler.
 *
 * The decorator stores refresh-related metadata using `Reflect.defineMetadata`.
 * This metadata can later be used to configure token refresh processes in the application.
 *
 * **Important:**
 * 1. Ensure that your backend properly generates and handles `refresh_token` values.
 * 2. Confirm that `reflect-metadata` is imported at the top level of your application.
 * 3. Ensure that `emitDecoratorMetadata` and `experimentalDecorators` are enabled in your `tsconfig.json`.
 *
 * @param options - The refresh configuration options (e.g., token rotation policies, expiration times, etc.)
 * @returns A ClassDecorator function that attaches BDAG Refresh metadata to the target class.
 */
export function BdagRefresh(options: BdagRefreshOptions): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(BDAG_REFRESH_METADATA, options, target);
	};
}
