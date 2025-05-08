/**
 * @fileoverview
 * Brand Builder Module
 *
 * This module is responsible for orchestrating the build process for multiple brands and platforms.
 * It acts as the core execution engine for the token generation pipeline, transforming the split design
 * tokens into their final platform-specific formats for each brand.
 *
 * The module:
 * - Coordinates building multiple brand/platform combinations in parallel
 * - Creates and configures Style Dictionary instances for each combination
 * - Manages error handling and reporting during the build process
 * - Tracks build progress and provides completion status
 *
 * This is typically invoked by the main build script after token splitting has been completed.
 */

import StyleDictionary from 'style-dictionary'

import buildStyleDictionaryConfig from './buildStyleDictionaryConfig.mjs'

/**
 * Builds Style Dictionary configurations for multiple brands and platforms asynchronously.
 * @param {string[]} brands - An array of brand names for which configurations are being built.
 * @param {string[]} platforms - An array of platform names for which configurations are being built.
 * @param {BrandsStyleDictionaryConfigOptions} options - The configuration options for building Style Dictionary configurations.
 * @returns {Promise<void>} A Promise that resolves when all configurations are built.
 */
const buildBrands = async (brands, platforms, options) => {
	const buildPromises = brands.map(async (brand) => {
		return Promise.all(
			platforms.map(async (platform) => {
				const sd = new StyleDictionary(buildStyleDictionaryConfig(brand, platform, options))
				await sd.buildPlatform(platform)
			})
		)
	})

	await Promise.all(buildPromises)
}

export default buildBrands
