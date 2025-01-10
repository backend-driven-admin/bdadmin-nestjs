import "reflect-metadata";
import {
	BDAG_VALIDATIONS_METADATA,
	type BdagValidationOptions,
} from "../interfaces/bdag-metadata.interface";

/**
 * A property decorator that marks a class property for BDAG validation.
 *
 * The decorator collects validation metadata for class properties and stores it using `Reflect.defineMetadata`.
 * Each time it's applied, it retrieves the existing validation metadata for the class, adds the new field's
 * validation rules, and updates the metadata accordingly.
 *
 * **Important:**
 * 1. Ensure that `reflect-metadata` is imported at the top level of your application.
 * 2. Confirm that `emitDecoratorMetadata` and `experimentalDecorators` are enabled in your `tsconfig.json`.
 *
 * @param options - The validation configuration options for the property (e.g., required, minLength, maxLength, custom validators, etc.)
 * @returns A PropertyDecorator function that attaches BDAG Validation metadata to the target property.
 */
export function BdagValidation(
	options: BdagValidationOptions,
): PropertyDecorator {
	return (target, key) => {
		// Retrieve the array of existing validated fields for the target class, if any
		const existingFields =
			Reflect.getMetadata(BDAG_VALIDATIONS_METADATA, target.constructor) || [];

		// Add the new field validation description to the array
		existingFields.push({
			key: key.toString(),
			...options,
		});

		// Update the metadata on the target class with the new array of validations
		Reflect.defineMetadata(
			BDAG_VALIDATIONS_METADATA,
			existingFields,
			target.constructor,
		);
	};
}
