import {
	BDADMIN_VALIDATIONS_METADATA,
	type BdAdminValidationOptions,
} from "../interfaces/bdadmin-metadata.interface";

/**
 * A property decorator that marks a class property for BDADMIN validation.
 *
 * This decorator collects metadata about validation rules for the decorated property and stores it
 * using `Reflect.defineMetadata`. These validation rules can later be retrieved and used to enforce
 * constraints during runtime or in administrative configurations.
 *
 * **Key Points:**
 * 1. Ensure that `reflect-metadata` is imported at the top level of your application to enable metadata storage.
 * 2. Enable `emitDecoratorMetadata` and `experimentalDecorators` in your `tsconfig.json`.
 * 3. Use this decorator to define validation rules, such as required fields, minimum or maximum values, and regex patterns.
 *
 * **Options:**
 * - `type` (BdAdminFieldBaseType): Specifies the data type of the property (e.g., `string`, `number`, etc.).
 * - `min` (number, optional): Defines the minimum value for numeric fields or minimum length for strings.
 * - `max` (number, optional): Defines the maximum value for numeric fields or maximum length for strings.
 * - `required` (boolean, optional): Indicates if the field is mandatory.
 * - `unique` (boolean, optional): Specifies if the field must be unique across the dataset.
 * - `hidden` (boolean, optional): Determines if the field should be hidden in the UI.
 * - `disabled` (boolean, optional): Marks the field as read-only.
 * - `defaultValue` (any, optional): Sets a default value for the field.
 * - `regex` (RegExp | string, optional): Specifies a regular expression for validating string fields.
 * - `dataSource` (BdAdminDataSource, optional): Configures a data source for dropdown or selection fields.
 *
 * **Usage Example:**
 * ```typescript
 * import { BdAdminValidation } from '@bdadmin/nestjs';
 *
 * class UserDto {
 *   @BdAdminValidation({ type: 'string', required: true, max: 50 })
 *   username: string;
 *
 *   @BdAdminValidation({ type: 'number', min: 18, max: 65 })
 *   age: number;
 * }
 * ```
 *
 * **Behavior:**
 * - Retrieves existing validation metadata for the class and appends new rules for the decorated property.
 * - Updates the metadata on the class constructor with the new validation rules.
 * - The metadata can be accessed dynamically to enforce constraints or generate validation logic.
 *
 * @param options - Configuration options for validation rules, including constraints and data type.
 * @returns A PropertyDecorator function that attaches validation metadata to the target property.
 */
export function BdAdminValidation(
	options: BdAdminValidationOptions,
): PropertyDecorator {
	return (target, key) => {
		// Retrieve the array of existing validated fields for the target class, if any
		const existingFields =
			Reflect.getMetadata(BDADMIN_VALIDATIONS_METADATA, target.constructor) ||
			[];

		// Add the new field validation description to the array
		existingFields.push({
			key: key.toString(),
			...options,
		});

		// Update the metadata on the target class with the new array of validations
		Reflect.defineMetadata(
			BDADMIN_VALIDATIONS_METADATA,
			existingFields,
			target.constructor,
		);
	};
}
