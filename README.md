# poc-tokens

## Setting up repo

```bash
npm init # Init npm repo
nvm install # Switch to the proper node version
npm i -D typescript typescript-eslint prettier globals @eslint/css @eslint/js @eslint/json @eslint/markdown @types/node eslint eslint-config-prettier eslint-plugin-html eslint-plugin-jsdoc eslint-plugin-perfectionist eslint-plugin-prettier # Install formatting and linting dependencies
npm i style-dictionary # Install the main dependency to transform tokens from Figma
```

## Design Tokens Workflow

This repository provides a workflow for processing design tokens exported from Figma. The workflow includes:

1. Splitting the design tokens file by top-level keys
2. Generating style dictionaries from the split tokens
3. Building output formats (CSS, JS, etc.) for different brands and platforms

### Commands

```bash
# Split tokens only (based on configuration in token-config.js)
npm run split-tokens

# Run the complete build process (includes splitting)
npm run build

# Run the build with a custom source path
npm run build -- --source=./path/to/tokens
```

### Configuration

The token splitting process can be configured in the `token-config.js` file:

```javascript
// token-config.js
export default {
	// Option 1: Include only specific keys
	includeKeys: ['Themes/ZRH', 'Themes/DXN'],

	// Option 2: Exclude specific keys (comment out includeKeys if using this)
	// excludeKeys: ["global"],

	// Optional custom paths
	// inputFile: './input/design-tokens.json',
	// outputDir: './temp',
}
```

### Workflow Details

1. **Token Splitting**: The `split-design-tokens.mjs` script processes the Figma-generated `design-tokens.json` file:

   - Splits tokens by top-level keys
   - Can include only specified keys or exclude specific keys
   - Creates JSON files in a temp directory with appropriate naming (e.g., "Themes/ZRH" becomes "Themes_ZRH.json")

2. **Style Dictionary Generation**: The build process takes the split token files and:

   - Uses them as source files for Style Dictionary
   - Applies transformations based on token types
   - Generates output in various formats for different brands and platforms

3. **File Structure**:
   - `/input` - Contains the original Figma-exported design tokens
   - `/temp` - Temporary directory for split token files
   - `/build` - Output directory for transformed tokens
   - `/lib` - Core library files for the build process
   - `/scripts` - Build and utility scripts

### Customization

- Edit `buildStyleDictionaryConfig.mjs` to customize output formats and transformations
- Modify brand configurations in `build-style-dictionary.mjs`
- Adjust transform groups and formats in the registration sections of `build-style-dictionary.mjs`
