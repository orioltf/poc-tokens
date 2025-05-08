/**
 * @fileoverview
 * TypeScript ES6 Format Module
 *
 * This module provides a custom format for Style Dictionary that outputs TypeScript
 * files using ES6 export syntax. It generates TypeScript variables for design tokens
 * with proper typing and export statements.
 *
 * The format:
 * - Adds appropriate TypeScript file header with auto-generation notice
 * - Preserves token comments as JSDoc comments
 * - Uses ES6 export syntax for individual token constants
 * - Properly formats token values with quotes for string values
 */

/**
 * @typedef {import('style-dictionary').Config} Format
 */

/**
 * TypeScript/ES6 format for Style Dictionary tokens.
 * Generates TypeScript code with ES6 export syntax for design tokens.
 *
 * @type {Format}
 */
const typescriptES6 = {
	format: async function ({ dictionary, options /* , file */ }) {
		return (
			'/**\n' +
			' * Do not edit directly, this file was auto-generated.\n' +
			' */\n\n' +
			dictionary.allTokens
				.map(function (token) {
					let to_ret_token = ''
					if (token.comment) to_ret_token += '/** ' + token.comment + ' */\n'
					to_ret_token += `export const ${token.name} = '${options.usesDtcg ? token.$value : token.value}'`
					return to_ret_token
				})
				.join('\n') +
			'\n'
		)
	},
	name: 'typescript/es6',
}

export default typescriptES6
