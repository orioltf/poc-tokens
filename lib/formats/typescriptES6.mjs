/**
 * @typedef {import('style-dictionary').Config} Format
 */

/**
 * TypeScript/ES6 format for Style Dictionary tokens.
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
