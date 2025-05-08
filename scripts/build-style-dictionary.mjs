import { readdirSync } from 'fs'
import path from 'path'

import buildBrands from '../lib/buildBrands.mjs'
import ConfigManager from '../lib/configManager.mjs'
import registerTransforms from '../lib/registerTransforms.mjs'
import splitDesignTokens from './split-design-tokens.mjs'

// Register all transforms, formats, and transform groups
registerTransforms()

/**
 * Main execution function for the build process
 * @param {string[]} cliArgs - Command-line arguments
 * @returns {Promise<void>}
 */
const exec = async function (cliArgs = []) {
	try {
		console.log('Build started...')

		// Parse command line arguments
		const sourcePath = cliArgs.find((arg) => arg.startsWith('--source='))?.split('=')[1] || ''

		// Initialize configuration
		const configManager = new ConfigManager()
		const configPath = path.resolve(process.cwd(), 'token-config.js')
		await configManager.loadFromFile(configPath)

		// Override configuration with command line arguments if provided
		if (sourcePath) {
			configManager.mergeConfig({
				sourcePathPrefix: path.resolve(process.cwd(), sourcePath),
			})
		}

		// Get configuration for different build phases
		const { buildPathPrefix, tempDir } = configManager.getBrandPlatformConfig()
		const splitConfig = configManager.getSplitConfig()

		console.log(`Configuration loaded. Using source path: ${splitConfig.inputFile}`)

		// Step 1: Split the design tokens file
		console.log('Step 1: Splitting design tokens file...')
		try {
			await splitDesignTokens(splitConfig)
		} catch (error) {
			console.error('Error during token splitting:', error.message)
			throw new Error('Token splitting failed. Check your design-tokens.json file and configuration.')
		}

		// Use the split tokens as source files
		const sourceFiles = readdirSync(tempDir)
			.filter((file) => file.endsWith('.json'))
			.map((file) => path.join(tempDir, file))

		if (sourceFiles.length === 0) {
			throw new Error('No source files were generated during token splitting.')
		}

		console.log(`Using ${sourceFiles.length} split token files as source`)

		// Step 2: Build style dictionaries from the split tokens
		console.log('Step 2: Building style dictionaries...')

		// Get brands and platforms from configuration
		const { brands, platforms } = configManager.getBrandPlatformConfig()

		// Build options for Style Dictionary
		const buildOptions = {
			buildPathPrefix,
			sourceFiles,
			sourcePathPrefix: tempDir,
		}

		try {
			// Process the design tokens for the different brands and platforms
			await buildBrands(brands, platforms, buildOptions)
		} catch (error) {
			console.error('Error during style dictionary building:', error.message)
			throw new Error('Style dictionary building failed. Check logs for details.')
		}

		console.log('\n==============================================')
		console.log('\nBuild completed successfully!')
	} catch (error) {
		console.error(`\nBuild failed: ${error.message}`)
		process.exit(1)
	}
}

// Run the build process with command line arguments
await exec(process.argv.slice(2))
