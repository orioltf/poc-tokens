/**
 * Configuration for token splitting and style dictionary generation
 *
 * This file configures how the design tokens are split and processed
 * You can either specify:
 * - includeKeys: Only these keys will be processed (e.g., ["Themes/ZRH", "Themes/DXN"])
 * - excludeKeys: All keys except these will be processed (e.g., ["global"])
 *
 * Note: Only one of includeKeys or excludeKeys should be used, not both.
 */
export default {
	// Source file path (relative to project root)
	// inputFile: './input/design-tokens.json', // Uncomment to override default

	// Output directory for split token files (relative to project root)
	// outputDir: './temp', // Uncomment to override default

	// Keys to include (if specified, only these will be processed)
	includeKeys: ['Themes/ZRH', 'Themes/DXN'],

	// Keys to exclude (only used if includeKeys is not specified)
	// excludeKeys: ["global"],
}
