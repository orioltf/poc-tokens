import { readdirSync } from 'fs'
import path from 'path'
import StyleDictionary from 'style-dictionary'
import { fileURLToPath } from 'url'

import buildBrands from '../lib/buildBrands.mjs'
import typescriptES6 from '../lib/formats/typescriptES6.mjs'
import colorGradient from '../lib/transforms/colorGradient.mjs'
import splitDesignTokens from './split-design-tokens.mjs'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

StyleDictionary.registerFormat(typescriptES6)

StyleDictionary.registerTransform(colorGradient)

StyleDictionary.registerTransformGroup({
	name: 'custom/css',
	transforms: [
		'attribute/cti',
		'attribute/color',
		'color/css',
		'color/gradient',
		'name/kebab',
		'time/seconds',
		'html/icon',
		'size/pxToRem',
		'asset/url',
		'fontFamily/css',
		'cubicBezier/css',
		'strokeStyle/css/shorthand',
		'border/css/shorthand',
		'typography/css/shorthand',
		'transition/css/shorthand',
		'shadow/css/shorthand',
	],
})

StyleDictionary.registerTransformGroup({
	name: 'custom/js',
	// this is to show one possibility for adding a few transforms to a pre-defined group
	// (however, we suggest to use the previous approach, which is more explicit and clear)
	// transforms: StyleDictionary.transformGroup['css'].concat(['size/px', 'ratio/%']),
	transforms: [
		'attribute/cti',
		'attribute/color',
		'name/camel',
		'time/seconds',
		'html/icon',
		'color/css',
		'color/gradient',
		'size/rem',
		'asset/url',
		'size/pxToRem',
		'fontFamily/css',
		'cubicBezier/css',
		'strokeStyle/css/shorthand',
		'border/css/shorthand',
		'typography/css/shorthand',
		'transition/css/shorthand',
		'shadow/css/shorthand',
	],
})

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

/**
 * Asynchronously executes the build process for design tokens for different brands and platforms.
 * @param {string[]} brands - An array of brand names for which configurations are being built.
 * @param {string[]} platforms - An array of platform names for which configurations are being built.
 * @param {Object} options - Additional build options
 * @returns {Promise<void>} A Promise that resolves when the build process is completed.
 */
const exec = async function (brands, platforms, options = {}) {
	console.log('Build started...')

	const { buildPathPrefix = path.join(__dirname, '..', 'build'), sourcePath = '', sourcePathPrefix = path.join(__dirname, '..', 'input') } = options

	// Determine the actual input directory to use
	const effectiveSourcePath = sourcePath
		? path.resolve(process.cwd(), sourcePath) // Use the provided source path if available
		: sourcePathPrefix // Otherwise fall back to the default

	// First step: Split the design tokens file
	console.log('Step 1: Splitting design tokens file...')
	console.log(`Using source path: ${effectiveSourcePath}`)
	const tempDir = path.join(__dirname, '..', 'temp')
	const inputFile = path.join(effectiveSourcePath, 'design-tokens.json')

	// Load configuration file if it exists
	let tokenConfig = {}
	try {
		const configPath = path.resolve(process.cwd(), 'token-config.js')
		tokenConfig = (await import(configPath)).default
	} catch {
		console.log('No token configuration file found, using defaults')
	}

	// Split tokens according to configuration
	await splitDesignTokens({
		excludeKeys: tokenConfig.excludeKeys || [],
		includeKeys: tokenConfig.includeKeys || [],
		inputFile,
		outputDir: tempDir,
	})

	// Use the split tokens as source files
	const sourceFiles = readdirSync(tempDir)
		.filter((file) => file.endsWith('.json'))
		.map((file) => path.join(tempDir, file))

	if (sourceFiles.length === 0) {
		console.error('No source files found in temp directory!')
		process.exit(1)
	}

	console.log(`Using ${sourceFiles.length} split token files as source`)

	// Step 2: Build style dictionaries from the split tokens
	console.log('Step 2: Building style dictionaries...')

	// Update buildBrands to use sourceFiles instead of a single file
	const buildOptions = {
		buildPathPrefix,
		sourceFiles,
		sourcePathPrefix: tempDir,
	}

	// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT BRANDS AND PLATFORMS
	await buildBrands(brands, platforms, buildOptions)

	console.log('\n==============================================')
	console.log('\nBuild completed!')
}

/**
 * @type {string[]}
 */
// const BRANDS = readdirSync(path.join(__dirname, '..', 'src', 'lib', 'core', 'dxp-design-system', 'tokens', 'brands')) // ['dxn-default', 'zrh-default']
const BRANDS = ['dxn-default', 'zrh-default']

/**
 * @type {string[]}
 */
const PLATFORMS = ['css', 'js']

// Parse command line arguments
const args = process.argv.slice(2)
const sourcePath = args.find((arg) => arg.startsWith('--source='))?.split('=')[1] || ''

await exec(BRANDS, PLATFORMS, { sourcePath })
