import "reflect-metadata";
import {
	BDAG_FIELDS_METADATA,
	type BdagFieldOptions,
} from "../interfaces/bdag-metadata.interface";

/**
 * A property decorator that marks a class property as a BDAG Field.
 *
 * The decorator gathers field metadata and stores it using `Reflect.defineMetadata`.
 * Each time the decorator is applied, it retrieves existing field metadata for the class,
 * appends new field information, and then updates the metadata storage.
 *
 * **Important:**
 * 1. Ensure that `reflect-metadata` is imported at the top level of your application.
 * 2. Confirm that `emitDecoratorMetadata` and `experimentalDecorators` are enabled in your `tsconfig.json`.
 *
 * @param options - The field configuration options (e.g., type, validation rules, display name, etc.)
 * @returns A PropertyDecorator function that attaches BDAG Field metadata to the target property.
 */
export function BdagField(options: BdagFieldOptions): PropertyDecorator {
	return (target, key) => {
		// Retrieve the array of existing fields for the target class, if any
		const existingFields =
			Reflect.getMetadata(BDAG_FIELDS_METADATA, target.constructor) || [];

		// Add the new field description to the array
		existingFields.push({
			key: key.toString(),
			...options,
		});

		// Update the metadata on the target class with the new array of fields
		Reflect.defineMetadata(
			BDAG_FIELDS_METADATA,
			existingFields,
			target.constructor,
		);
	};
}
