export default function renderTemplate(
	template: string,
	data: Record<string, string>,
): string {
	let output = template;
	for (const key in data) {
		const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
		output = output.replace(regex, data[key]);
	}
	return output;
}
