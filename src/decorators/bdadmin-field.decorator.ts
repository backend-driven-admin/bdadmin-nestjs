import {
	BDADMIN_FIELDS_METADATA,
	type BdAdminFieldOptions,
} from "../interfaces/bdadmin-metadata.interface";

/**
 * A property decorator that marks a class property as a BDADMIN Field.
 *
 * This decorator collects metadata for the decorated property, such as its type,
 * visibility, and behavior, and stores it using `Reflect.defineMetadata`.
 * Fields marked with this decorator can be used for dynamic administrative panels,
 * API responses, and other configuration-driven use cases.
 *
 * **Key Points:**
 * 1. Ensure `reflect-metadata` is imported at the top level of your application.
 * 2. Enable `emitDecoratorMetadata` and `experimentalDecorators` in your `tsconfig.json`.
 * 3. Use this decorator to define attributes of fields, such as their type, searchability, and sortability.
 *
 * **Options:**
 * - `type` (BdAdminFieldBaseType): Specifies the base type of the field (e.g., `string`, `number`, `boolean`, etc.).
 * - `sort` (boolean, optional): Indicates if the field is sortable in lists or tables.
 * - `search` (boolean, optional): Indicates if the field is searchable in administrative tools.
 *
 * **Usage Example:**
 * ```typescript
 * import { BdAdminField } from '@bdadmin/nestjs';
 *
 * class UserEntity {
 *   @BdAdminField({ type: 'string', sort: true, search: true })
 *   name: string;
 *
 *   @BdAdminField({ type: 'number', sort: true })
 *   age: number;
 * }
 * ```
 *
 * **Behavior:**
 * - Retrieves existing metadata for the class (if any) and appends the new field's metadata.
 * - Updates the metadata on the class constructor to include all fields.
 * - The metadata can be accessed dynamically to generate configurations for administrative panels or APIs.
 *
 * @param options - Configuration options for the field.
 * @returns A PropertyDecorator function that attaches field metadata to the class property.
 */
export function BdAdminField(options: BdAdminFieldOptions): PropertyDecorator {
	return (target, key) => {
		// Retrieve the array of existing fields for the target class, if any
		const existingFields =
			Reflect.getMetadata(BDADMIN_FIELDS_METADATA, target.constructor) || [];

		// Add the new field description to the array
		existingFields.push({
			key: key.toString(),
			...options,
		});

		// Update the metadata on the target class with the new array of fields
		Reflect.defineMetadata(
			BDADMIN_FIELDS_METADATA,
			existingFields,
			target.constructor,
		);
	};
}
