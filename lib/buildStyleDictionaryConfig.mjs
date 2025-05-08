/**
 * @typedef {object} BrandsStyleDictionaryConfigOptions
 * @property {string} sourcePathPrefix - Path prefix for source files
 * @property {string} buildPathPrefix - Path prefix for build output
 * @property {string[]} [sourceFiles] - Optional array of full paths to source files
 */

/**
 * @typedef {import('style-dictionary').Config} Config
 */

/**
 * Builds the Style Dictionary configuration for a specific brand and platform.
 * @param {string} brand - The brand for which the configuration is being built.
 * @param {string} platform - The platform for which the configuration is being built.
 * @param {BrandsStyleDictionaryConfigOptions} options - The configuration object containing source and build paths.
 * @returns {Config} The Style Dictionary configuration object.
 */
const buildStyleDictionaryConfig = function (brand, platform, options) {
	// Determine source configuration
	let source

	if (options.sourceFiles && options.sourceFiles.length > 0) {
		// If specific source files are provided, use those
		source = options.sourceFiles
		console.log(`Using ${source.length} specific source files for ${brand}/${platform}`)
	} else {
		// Otherwise, use the traditional pattern matching approach
		source = [
			`${options.sourcePathPrefix}/*.@(json|json5)`,
			// `${options.sourcePathPrefix}/brands/${brand}/*.@(json|json5)`,
			// `${options.sourcePathPrefix}/globals/**/*.@(json|json5)`,
			// `${options.sourcePathPrefix}/platforms/${platform}/*.@(json|json5)`,
		]
		console.log(`Using pattern matching for source files: ${source[0]}`)
	}

	return {
		basePxFontSize: 16,
		// these are the defaults
		log: {
			errors: {
				brokenReferences: 'throw', // 'throw' | 'console'
			},
			verbosity: 'verbose', // 'default' | 'silent' | 'verbose'
			warnings: 'warn', // 'warn' | 'error' | 'disabled'
		},
		platforms: {
			android: {
				buildPath: `${options.buildPathPrefix}/${brand}/android/`,
				files: [
					{
						destination: 'tokens.colors.xml',
						filter: {
							$type: 'color',
						},
						format: 'android/colors',
					},
					{
						destination: 'tokens.gradients.xml',
						filter: {
							$type: 'gradient',
						},
						format: 'android/colors',
					},
					{
						destination: 'tokens.dimensions.xml',
						filter: {
							$type: 'dimension',
						},
						format: 'android/resources',
					},
					{
						destination: 'tokens.font_dimensions.xml',
						filter: {
							$type: 'dimension',
						},
						format: 'android/resources',
					},
					{
						destination: 'tokens.shadows.xml',
						filter: {
							$type: 'shadow',
						},
						format: 'android/resources',
					},
					{
						destination: 'tokens.durations.xml',
						filter: {
							$type: 'duration',
						},
						format: 'android/resources',
					},
				],
				transformGroup: 'android',
			},
			compose: {
				buildPath: `${options.buildPathPrefix}/${brand}/compose/`,
				files: [
					{
						destination: 'StyleDictionaryColor.kt',
						filter: {
							$type: 'color',
						},
						format: 'compose/object',
						options: {
							className: 'StyleDictionaryColor',
							packageName: 'StyleDictionaryColor',
						},
					},
					{
						destination: 'StyleDictionaryGradient.kt',
						filter: {
							$type: 'gradient',
						},
						format: 'compose/object',
						options: {
							className: 'StyleDictionaryGradient',
							packageName: 'StyleDictionaryGradient',
						},
					},
					{
						destination: 'StyleDictionaryDimension.kt',
						filter: {
							$type: 'dimension',
						},
						format: 'compose/object',
						options: {
							className: 'StyleDictionaryDimension',
							packageName: 'StyleDictionaryDimension',
							type: 'float',
						},
					},
					{
						destination: 'StyleDictionaryShadow.kt',
						filter: {
							$type: 'shadow',
						},
						format: 'compose/object',
						options: {
							className: 'StyleDictionaryShadow',
							packageName: 'StyleDictionaryShadow',
						},
					},
					{
						destination: 'StyleDictionaryDuration.kt',
						filter: {
							$type: 'duration',
						},
						format: 'compose/object',
						options: {
							className: 'StyleDictionaryDuration',
							packageName: 'StyleDictionaryDuration',
						},
					},
				],
				transformGroup: 'compose',
			},
			css: {
				buildPath: `${options.buildPathPrefix}/${brand}/css/`,
				files: [
					{
						destination: 'tokens.css',
						filter: {
							$type: 'color',
						},
						format: 'css/variables',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'gradients.css',
						filter: {
							$type: 'gradient',
						},
						format: 'css/variables',
					},
					{
						destination: 'dimensions.css',
						filter: {
							$type: 'dimension',
						},
						format: 'css/variables',
					},
					{
						destination: 'shadows.css',
						filter: {
							$type: 'shadow',
						},
						format: 'css/variables',
					},
					{
						destination: 'durations.css',
						filter: {
							$type: 'duration',
						},
						format: 'css/variables',
					},
				],
				transformGroup: 'custom/css',
			},
			ios: {
				buildPath: `${options.buildPathPrefix}/${brand}/ios/`,
				files: [
					{
						destination: 'tokens.h',
						format: 'ios/macros',
					},
					{
						destination: 'StyleDictionaryColor.h',
						filter: {
							$type: 'color',
						},
						format: 'ios/colors.h',
						options: {
							className: 'StyleDictionaryColor',
							type: 'StyleDictionaryColorName',
						},
					},
					{
						destination: 'StyleDictionaryColor.m',
						filter: {
							$type: 'color',
						},
						format: 'ios/colors.m',
						options: {
							className: 'StyleDictionaryColor',
							type: 'StyleDictionaryColorName',
						},
					},
					{
						destination: 'StyleDictionaryDimension.h',
						filter: {
							$type: 'dimension',
						},
						format: 'ios/static.h',
						options: {
							className: 'StyleDictionaryDimension',
							type: 'float',
						},
					},
					{
						destination: 'StyleDictionaryDimension.m',
						filter: {
							$type: 'dimension',
						},
						format: 'ios/static.m',
						options: {
							className: 'StyleDictionaryDimension',
							type: 'float',
						},
					},
				],
				transformGroup: 'ios',
			},
			'ios-swift': {
				buildPath: `${options.buildPathPrefix}/${brand}/ios-swift/`,
				files: [
					{
						destination: 'StyleDictionary+Class.swift',
						format: 'ios-swift/class.swift',
						options: {
							className: 'StyleDictionaryClass',
						},
					},
					{
						destination: 'StyleDictionary+Enum.swift',
						format: 'ios-swift/enum.swift',
						options: {
							className: 'StyleDictionaryEnum',
						},
					},
					{
						destination: 'StyleDictionary+Struct.swift',
						format: 'ios-swift/any.swift',
						options: {
							accessControl: 'internal',
							className: 'StyleDictionaryStruct',
							imports: 'SwiftUI',
							objectType: 'struct',
						},
					},
				],
				transformGroup: 'ios-swift',
			},
			'ios-swift-separate-enums': {
				buildPath: `${options.buildPathPrefix}/${brand}/ios-swift/`,
				files: [
					{
						destination: 'StyleDictionaryColor.swift',
						filter: {
							$type: 'color',
						},
						format: 'ios-swift/enum.swift',
						options: {
							className: 'StyleDictionaryColor',
						},
					},
					{
						destination: 'StyleDictionaryGradient.swift',
						filter: {
							$type: 'gradient',
						},
						format: 'ios-swift/enum.swift',
						options: {
							className: 'StyleDictionaryGradient',
						},
					},
					{
						destination: 'StyleDictionaryDimension.swift',
						filter: {
							$type: 'dimension',
						},
						format: 'ios-swift/enum.swift',
						options: {
							className: 'StyleDictionaryDimension',
						},
					},
					{
						destination: 'StyleDictionaryShadow.swift',
						filter: {
							$type: 'shadow',
						},
						format: 'ios-swift/enum.swift',
						options: {
							className: 'StyleDictionaryShadow',
						},
					},
					{
						destination: 'StyleDictionaryDuration.swift',
						filter: {
							$type: 'duration',
						},
						format: 'ios-swift/enum.swift',
						options: {
							className: 'StyleDictionaryDuration',
						},
					},
				],
				transformGroup: 'ios-swift-separate',
			},
			js: {
				basePxFontSize: 16,
				buildPath: `${options.buildPathPrefix}/${brand}/js/`,
				files: [
					{
						destination: 'tokens.js',
						filter: {
							$type: 'color',
						},
						format: 'javascript/es6',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'tsTokens.ts',
						filter: {
							$type: 'color',
						},
						format: 'typescript/es6',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'gradients.js',
						filter: {
							$type: 'gradient',
						},
						format: 'javascript/es6',
					},
					{
						destination: 'tsGradients.ts',
						filter: {
							$type: 'gradient',
						},
						format: 'typescript/es6',
					},
					{
						destination: 'dimensions.js',
						filter: {
							$type: 'dimension',
						},
						format: 'javascript/es6',
					},
					{
						destination: 'tsDimensions.ts',
						filter: {
							$type: 'dimension',
						},
						format: 'typescript/es6',
					},
					{
						destination: 'shadows.js',
						filter: {
							$type: 'shadow',
						},
						format: 'javascript/es6',
					},
					{
						destination: 'tsShadows.ts',
						filter: {
							$type: 'shadow',
						},
						format: 'typescript/es6',
					},
					{
						destination: 'durations.js',
						filter: {
							$type: 'duration',
						},
						format: 'javascript/es6',
					},
					{
						destination: 'tsDurations.ts',
						filter: {
							$type: 'duration',
						},
						format: 'typescript/es6',
					},
				],
				transformGroup: 'custom/js',
			},
			json: {
				buildPath: `${options.buildPathPrefix}/${brand}/json/`,
				files: [
					{
						destination: 'tokens.json',
						filter: {
							$type: 'color',
						},
						format: 'json',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'tokensNested.json',
						filter: {
							$type: 'color',
						},
						format: 'json/nested',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'gradients.json',
						filter: {
							$type: 'gradient',
						},
						format: 'json',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'gradientsNested.json',
						filter: {
							$type: 'gradient',
						},
						format: 'json/nested',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'dimensions.json',
						filter: {
							$type: 'dimension',
						},
						format: 'json',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'dimensionsNested.json',
						filter: {
							$type: 'dimension',
						},
						format: 'json/nested',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'shadows.json',
						filter: {
							$type: 'shadow',
						},
						format: 'json',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'shadowsNested.json',
						filter: {
							$type: 'shadow',
						},
						format: 'json/nested',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'durations.json',
						filter: {
							$type: 'duration',
						},
						format: 'json',
						options: {
							outputReferences: true,
						},
					},
					{
						destination: 'durationsNested.json',
						filter: {
							$type: 'duration',
						},
						format: 'json/nested',
						options: {
							outputReferences: true,
						},
					},
				],
				transforms: ['attribute/cti'],
			},
			web: {
				buildPath: `${options.buildPathPrefix}/${brand}/web/`,
				files: [
					{
						destination: 'tokens.scss',
						filter: {
							$type: 'color',
						},
						format: 'scss/variables',
					},
					{
						destination: 'gradients.scss',
						filter: {
							$type: 'gradient',
						},
						format: 'scss/variables',
					},
					{
						destination: 'dimensions.scss',
						filter: {
							$type: 'dimension',
						},
						format: 'scss/variables',
					},
					{
						destination: 'shadows.scss',
						filter: {
							$type: 'shadow',
						},
						format: 'scss/variables',
					},
					{
						destination: 'durations.scss',
						filter: {
							$type: 'duration',
						},
						format: 'scss/variables',
					},
				],
				transformGroup: 'web',
			},
		},
		source: source,
		usesDtcg: true,
	}
}

export default buildStyleDictionaryConfig
