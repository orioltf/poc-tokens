// filepath: /workspaces/poc-tokens/lib/platformConfigs.mjs
/**
 * Factory for creating platform configurations with consistent structure
 * This reduces repetition in the buildStyleDictionaryConfig.mjs file
 */

/**
 * Creates a CSS platform configuration
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} CSS platform configuration
 */
export function createCssPlatform(brand, buildPathPrefix) {
	return {
		buildPath: `${buildPathPrefix}/${brand}/css/`,
		files: [
			{
				destination: 'tokens.css',
				filter: { $type: 'color' },
				format: 'css/variables',
				options: { outputReferences: true },
			},
			{
				destination: 'gradients.css',
				filter: { $type: 'gradient' },
				format: 'css/variables',
			},
			{
				destination: 'dimensions.css',
				filter: { $type: 'dimension' },
				format: 'css/variables',
			},
			{
				destination: 'shadows.css',
				filter: { $type: 'shadow' },
				format: 'css/variables',
			},
			{
				destination: 'durations.css',
				filter: { $type: 'duration' },
				format: 'css/variables',
			},
		],
		transformGroup: 'custom/css',
	}
}

/**
 * Creates a JSON platform configuration
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} JSON platform configuration
 */
export function createJsonPlatform(brand, buildPathPrefix) {
	return {
		buildPath: `${buildPathPrefix}/${brand}/json/`,
		files: [
			{
				destination: 'tokens.json',
				filter: { $type: 'color' },
				format: 'json',
				options: { outputReferences: true },
			},
			{
				destination: 'tokensNested.json',
				filter: { $type: 'color' },
				format: 'json/nested',
				options: { outputReferences: true },
			},
			{
				destination: 'gradients.json',
				filter: { $type: 'gradient' },
				format: 'json',
				options: { outputReferences: true },
			},
			{
				destination: 'gradientsNested.json',
				filter: { $type: 'gradient' },
				format: 'json/nested',
				options: { outputReferences: true },
			},
			{
				destination: 'dimensions.json',
				filter: { $type: 'dimension' },
				format: 'json',
				options: { outputReferences: true },
			},
			{
				destination: 'dimensionsNested.json',
				filter: { $type: 'dimension' },
				format: 'json/nested',
				options: { outputReferences: true },
			},
			{
				destination: 'shadows.json',
				filter: { $type: 'shadow' },
				format: 'json',
				options: { outputReferences: true },
			},
			{
				destination: 'shadowsNested.json',
				filter: { $type: 'shadow' },
				format: 'json/nested',
				options: { outputReferences: true },
			},
			{
				destination: 'durations.json',
				filter: { $type: 'duration' },
				format: 'json',
				options: { outputReferences: true },
			},
			{
				destination: 'durationsNested.json',
				filter: { $type: 'duration' },
				format: 'json/nested',
				options: { outputReferences: true },
			},
		],
		transforms: ['attribute/cti'],
	}
}

/**
 * Creates a JavaScript platform configuration
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} JavaScript platform configuration
 */
export function createJsPlatform(brand, buildPathPrefix) {
	return {
		basePxFontSize: 16,
		buildPath: `${buildPathPrefix}/${brand}/js/`,
		files: [
			{
				destination: 'tokens.js',
				filter: { $type: 'color' },
				format: 'javascript/es6',
				options: { outputReferences: true },
			},
			{
				destination: 'tsTokens.ts',
				filter: { $type: 'color' },
				format: 'typescript/es6',
				options: { outputReferences: true },
			},
			{
				destination: 'gradients.js',
				filter: { $type: 'gradient' },
				format: 'javascript/es6',
			},
			{
				destination: 'tsGradients.ts',
				filter: { $type: 'gradient' },
				format: 'typescript/es6',
			},
			{
				destination: 'dimensions.js',
				filter: { $type: 'dimension' },
				format: 'javascript/es6',
			},
			{
				destination: 'tsDimensions.ts',
				filter: { $type: 'dimension' },
				format: 'typescript/es6',
			},
			{
				destination: 'shadows.js',
				filter: { $type: 'shadow' },
				format: 'javascript/es6',
			},
			{
				destination: 'tsShadows.ts',
				filter: { $type: 'shadow' },
				format: 'typescript/es6',
			},
			{
				destination: 'durations.js',
				filter: { $type: 'duration' },
				format: 'javascript/es6',
			},
			{
				destination: 'tsDurations.ts',
				filter: { $type: 'duration' },
				format: 'typescript/es6',
			},
		],
		transformGroup: 'custom/js',
	}
}

/**
 * Returns all platform configurations for a given brand
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} All platform configurations
 */
export function getAllPlatforms(brand, buildPathPrefix) {
	return {
		css: createCssPlatform(brand, buildPathPrefix),
		js: createJsPlatform(brand, buildPathPrefix),
		json: createJsonPlatform(brand, buildPathPrefix),
		// Add other platforms as needed
	}
}

export default {
	createCssPlatform,
	createJsonPlatform,
	createJsPlatform,
	getAllPlatforms,
}
