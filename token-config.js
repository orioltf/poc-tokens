/**
 * Design tokens configuration
 *
 * This file configures how design tokens are processed throughout the build pipeline.
 */
export default {
	// Token splitting options

	// Brands to build for
	brands: ['dxn-default', 'zrh-default'],

	// Option 2: Exclude specific keys (comment out includeKeys if using this)
	// excludeKeys: ["global"],

	// Build configuration

	// Option 1: Include only specific keys (comment out excludeKeys if using this)
	includeKeys: ['Themes/ZRH', 'Themes/DXN'],

	// Platforms to build for
	platforms: ['css', 'js', 'json'],

	// Path configuration (optional - defaults will be used if not specified)
	// sourcePathPrefix: './input', // Source directory containing design-tokens.json
	// buildPathPrefix: './build',  // Output directory for built files
	// tempDir: './temp',           // Temporary directory for split token files
	// inputFile: 'design-tokens.json', // Input filename within sourcePathPrefix
}
