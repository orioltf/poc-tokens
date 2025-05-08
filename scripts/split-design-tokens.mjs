/**
 * @fileoverview
 * Design Token Splitting Script
 *
 * This script processes a master design token file and splits it into brand-specific
 * token files. It extracts brand-specific tokens from a unified source file and
 * saves them to separate output files for further processing.
 *
 * The script handles:
 * - Loading the source design tokens file
 * - Identifying and extracting brand-specific token groups
 * - Optionally filtering tokens based on include/exclude patterns
 * - Writing separate brand files to the temp directory
 *
 * The output files are used as input for the Style Dictionary build process.
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Splits a design tokens file based on its top-level keys and saves each to a separate file
 *
 * @param {Object} options - Configuration options
 * @param {string} options.inputFile - Path to the input design tokens file
 * @param {string} options.outputDir - Directory to save the split files
 * @param {string[]} [options.includeKeys] - Keys to include (if specified, only these keys will be processed)
 * @param {string[]} [options.excludeKeys] - Keys to exclude (only used if includeKeys is not specified)
 * @returns {Promise<string[]>} - Paths to the generated files
 *
 * @throws {Error} If both includeKeys and excludeKeys are specified
 * @throws {Error} If no tokens are generated
 * @throws {Error} If the input file is not found or is invalid JSON
 * @throws {Error} If the output directory cannot be created
 */
async function splitDesignTokens({ excludeKeys = [], includeKeys = [], inputFile, outputDir }) {
	console.log(`Splitting design tokens from ${inputFile}`)

	// Validate configuration
	if (includeKeys.length > 0 && excludeKeys.length > 0) {
		throw new Error('Cannot specify both includeKeys and excludeKeys. Choose one approach.')
	}

	// Ensure output directory exists
	try {
		await fs.mkdir(outputDir, { recursive: true })
	} catch (error) {
		throw new Error(`Failed to create output directory: ${error.message}`)
	}

	// Read and parse the tokens file
	let tokens
	try {
		const tokensContent = await fs.readFile(inputFile, 'utf8')
		tokens = JSON.parse(tokensContent)
	} catch (error) {
		if (error.code === 'ENOENT') {
			throw new Error(`Design tokens file not found at: ${inputFile}`)
		} else if (error instanceof SyntaxError) {
			throw new Error(`Invalid JSON in design tokens file: ${error.message}`)
		} else {
			throw new Error(`Error reading design tokens file: ${error.message}`)
		}
	}

	// Get top-level keys, excluding metadata keys
	const topLevelKeys = Object.keys(tokens).filter((key) => !key.startsWith('$') && key !== '$themes' && key !== '$metadata')

	console.log(`Found ${topLevelKeys.length} top-level keys in the tokens file`)

	// Determine which keys to process based on inclusion/exclusion patterns
	let keysToProcess = topLevelKeys

	// Handle inclusion pattern
	if (includeKeys.length > 0) {
		console.log(`Including only specified keys: ${includeKeys.join(', ')}`)

		// Validate that all requested keys exist
		const missingKeys = includeKeys.filter((key) => !topLevelKeys.includes(key))
		if (missingKeys.length > 0) {
			console.warn(`Warning: The following requested keys do not exist in the tokens file: ${missingKeys.join(', ')}`)
		}

		keysToProcess = includeKeys.filter((key) => topLevelKeys.includes(key))

		if (keysToProcess.length === 0) {
			throw new Error('None of the requested include keys exist in the tokens file.')
		}
	}
	// Handle exclusion pattern
	else if (excludeKeys.length > 0) {
		console.log(`Excluding specified keys: ${excludeKeys.join(', ')}`)

		// Validate that not all keys are being excluded
		const remainingKeys = topLevelKeys.filter((key) => !excludeKeys.includes(key))
		if (remainingKeys.length === 0) {
			throw new Error('All top-level keys would be excluded by the current excludeKeys configuration.')
		}

		keysToProcess = remainingKeys
	}

	console.log(`Processing ${keysToProcess.length} keys`)

	// Create a file for each key
	const generatedFiles = []

	for (const key of keysToProcess) {
		// Format the filename - replace slashes with underscores
		const filename = `${key.replace(/\//g, '_')}.json`
		const outputPath = path.join(outputDir, filename)

		// Check if the token for this key exists and is valid
		if (!tokens[key] || typeof tokens[key] !== 'object') {
			console.warn(`Warning: Key "${key}" has invalid or empty content. Skipping.`)
			continue
		}

		// Create the content for this key
		const content = JSON.stringify(tokens[key], null, 2)

		// Write the file
		try {
			await fs.writeFile(outputPath, content)
			console.log(`Created ${outputPath}`)

			generatedFiles.push(outputPath)
		} catch (error) {
			console.error(`Failed to write file for key "${key}": ${error.message}`)
		}
	}

	if (generatedFiles.length === 0) {
		throw new Error('No token files were generated. Check your configuration.')
	}

	return generatedFiles
}

// When script is run directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
	console.log('Running split-design-tokens as a standalone script')

	// Load configuration from token-config.js
	const configPath = path.resolve(process.cwd(), 'token-config.js')

	try {
		// Import the config dynamically
		import(configPath)
			.then(async (module) => {
				const config = module.default || {}

				const defaultInputFile = path.join(__dirname, '..', 'input', 'design-tokens.json')
				const defaultOutputDir = path.join(__dirname, '..', 'temp')

				const inputFile = config.inputFile || defaultInputFile
				const outputDir = config.outputDir || defaultOutputDir
				const includeKeys = config.includeKeys || []
				const excludeKeys = config.excludeKeys || []

				try {
					await splitDesignTokens({ excludeKeys, includeKeys, inputFile, outputDir })
					console.log('Design tokens split successfully!')
				} catch (error) {
					console.error('Error splitting design tokens:', error.message)
					process.exit(1)
				}
			})
			.catch((error) => {
				console.log('No configuration file found, using defaults')

				const inputFile = path.join(__dirname, '..', 'input', 'design-tokens.json')
				const outputDir = path.join(__dirname, '..', 'temp')

				splitDesignTokens({ inputFile, outputDir })
					.then(() => {
						console.log('Design tokens split successfully!')
					})
					.catch((error) => {
						console.error('Error splitting design tokens:', error.message)
						process.exit(1)
					})
			})
	} catch (error) {
		console.error('Error loading configuration:', error.message)
		process.exit(1)
	}
}

export default splitDesignTokens
