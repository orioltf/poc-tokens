/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
	endOfLine: 'auto',
	overrides: [
		{
			files: ['*.json', '*.yml', '*.yaml', '*.feature'],
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
	plugins: [],
	printWidth: 150,
	semi: false,
	singleQuote: true,
	trailingComma: 'es5',
	useTabs: true,
}
