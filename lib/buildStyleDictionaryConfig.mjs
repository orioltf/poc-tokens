/**
 * @fileoverview
 * Style Dictionary Configuration Builder
 *
 * This module generates configuration objects for Style Dictionary based on the user's
 * settings and available brands. It dynamically creates configurations that determine
 * how design tokens are transformed and formatted for different output platforms.
 *
 * The module handles:
 * - Creating brand-specific Style Dictionary configurations
 * - Applying platform-specific settings (CSS, JS, JSON outputs)
 * - Setting up appropriate transformations for different token types
 * - Configuring output file paths and formats
 *
 * This is a core piece of the design token pipeline that bridges the raw token data
 * with the final output formats.
 */

/**
 * @typedef {object} BrandsStyleDictionaryConfigOptions
 * @property {string} sourcePathPrefix - Path prefix for source files
 * @property {string} buildPathPrefix - Path prefix for build output
 * @property {string[]} [sourceFiles] - Optional array of full paths to source files
 */

/**
 * @typedef {import('style-dictionary').Config} Config
 */

import { getAllPlatforms } from './platformConfigs.mjs'

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
		source = [`${options.sourcePathPrefix}/*.@(json|json5)`]
		console.log(`Using pattern matching for source files: ${source[0]}`)
	}

	// Get platform configurations
	const platforms = getAllPlatforms(brand, options.buildPathPrefix)

	// Base configuration
	const config = {
		basePxFontSize: 16,
		log: {
			errors: {
				brokenReferences: 'throw', // 'throw' | 'console'
			},
			verbosity: 'verbose', // 'default' | 'silent' | 'verbose'
			warnings: 'warn', // 'warn' | 'error' | 'disabled'
		},
		platforms: {},
		source: source,
		usesDtcg: true,
	}

	// Add only the requested platform or all platforms if '*'
	if (platform === '*') {
		config.platforms = platforms
	} else if (platforms[platform]) {
		config.platforms[platform] = platforms[platform]
	} else {
		throw new Error(`Unknown platform: ${platform}`)
	}

	return config
}

export default buildStyleDictionaryConfig
