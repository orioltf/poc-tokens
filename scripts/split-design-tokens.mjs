import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Splits a design tokens file based on its top-level keys and saves each to a separate file
 * @param {Object} options - Configuration options
 * @param {string} options.inputFile - Path to the input design tokens file
 * @param {string} options.outputDir - Directory to save the split files
 * @param {string[]} [options.includeKeys] - Keys to include (if specified, only these keys will be processed)
 * @param {string[]} [options.excludeKeys] - Keys to exclude (only used if includeKeys is not specified)
 * @returns {Promise<string[]>} - Paths to the generated files
 */
async function splitDesignTokens({ excludeKeys = [], includeKeys = [], inputFile, outputDir }) {
	console.log(`Splitting design tokens from ${inputFile}`)

	// Ensure output directory exists
	await fs.mkdir(outputDir, { recursive: true })

	// Read and parse the tokens file
	const tokensContent = await fs.readFile(inputFile, 'utf8')
	const tokens = JSON.parse(tokensContent)

	// Get top-level keys
	const topLevelKeys = Object.keys(tokens).filter(
		(key) =>
			// Filter out metadata keys
			!key.startsWith('$') && key !== '$themes' && key !== '$metadata'
	)

	console.log(`Found ${topLevelKeys.length} top-level keys in the tokens file`)

	// Determine which keys to process
	let keysToProcess = topLevelKeys

	if (includeKeys.length > 0) {
		console.log(`Including only specified keys: ${includeKeys.join(', ')}`)
		keysToProcess = includeKeys
	} else if (excludeKeys.length > 0) {
		console.log(`Excluding specified keys: ${excludeKeys.join(', ')}`)
		keysToProcess = topLevelKeys.filter((key) => !excludeKeys.includes(key))
	}

	console.log(`Processing ${keysToProcess.length} keys`)

	// Create a file for each key
	const generatedFiles = []

	for (const key of keysToProcess) {
		// Format the filename - replace slashes with underscores
		const filename = `${key.replace(/\//g, '_')}.json`
		const outputPath = path.join(outputDir, filename)

		// Create the content for this key
		const content = JSON.stringify(tokens[key], null, 2)

		// Write the file
		await fs.writeFile(outputPath, content)
		console.log(`Created ${outputPath}`)

		generatedFiles.push(outputPath)
	}

	return generatedFiles
}

// When script is run directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
	// Load configuration or use command line arguments
	const configPath = path.resolve(process.cwd(), 'token-config.js')
	let config

	try {
		config = (await import(configPath)).default
		console.log('Using configuration from token-config.js')
	} catch {
		console.log('No configuration file found, using defaults')
		config = {}
	}

	const defaultInputFile = path.join(__dirname, '..', 'input', 'design-tokens.json')
	const defaultOutputDir = path.join(__dirname, '..', 'temp')

	const inputFile = config.inputFile || defaultInputFile
	const outputDir = config.outputDir || defaultOutputDir
	const includeKeys = config.includeKeys || []
	const excludeKeys = config.excludeKeys || []

	// Validate that only includeKeys or excludeKeys is specified, not both
	if (includeKeys.length > 0 && excludeKeys.length > 0) {
		console.error('Error: Cannot specify both includeKeys and excludeKeys. Choose one approach.')
		process.exit(1)
	}

	try {
		await splitDesignTokens({ excludeKeys, includeKeys, inputFile, outputDir })
		console.log('Design tokens split successfully!')
	} catch (error) {
		console.error('Error splitting design tokens:', error)
		process.exit(1)
	}
}

export default splitDesignTokens
