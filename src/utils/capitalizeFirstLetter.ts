/**
 * Capitalizes the first letter of a given string.
 *
 * **Usage:**
 * This utility function ensures that the first character of the provided string
 * is converted to uppercase, while the rest of the string remains unchanged.
 *
 * **Example:**
 * ```typescript
 * import { capitalizeFirstLetter } from './utils/capitalizeFirstLetter';
 *
 * const result = capitalizeFirstLetter("hello");
 * console.log(result); // Output: "Hello"
 * ```
 *
 * @param value - The string whose first letter needs to be capitalized.
 * @returns A new string with the first letter capitalized.
 */
export function capitalizeFirstLetter(value: string): string {
	return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}
