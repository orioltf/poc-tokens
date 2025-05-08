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

The token processing can be configured in the `token-config.js` file:

```javascript
// token-config.js
export default {
	// Token splitting options
	includeKeys: ['Themes/ZRH', 'Themes/DXN'], // Option 1: Only process these keys
	// excludeKeys: ["global"],                  // Option 2: Process all except these keys

	// Build configuration
	brands: ['dxn-default', 'zrh-default'], // Brands to build for
	platforms: ['css', 'js', 'json'], // Platforms to build for

	// Path configuration (optional - defaults will be used if not specified)
	// sourcePathPrefix: './input',              // Source directory
	// buildPathPrefix: './build',               // Output directory
	// tempDir: './temp',                        // Temporary directory
}
```

### Codebase Structure

The codebase is organized into modules with clear separation of concerns:

1. **Configuration Management**: Centralized in the `lib/configManager.mjs` module

   - Loads and validates configurations
   - Merges defaults with user settings
   - Provides configuration validation

2. **Token Splitting**: Implemented in `scripts/split-design-tokens.mjs`

   - Processes design tokens by top-level keys
   - Creates separate files in temp directory
   - Supports inclusion and exclusion patterns

3. **Platform Configuration**: Modular configuration in `lib/platformConfigs.mjs`

   - Factory functions for different platform configurations
   - Reduces duplication through component-based approach

4. **Transform Registration**: Centralized in `lib/registerTransforms.mjs`

   - Registers all custom formats and transforms
   - Defines transform groups for different platforms

5. **Build Process**: Orchestrated by `scripts/build-style-dictionary.mjs`
   - Ties together all modules
   - Handles errors gracefully
   - Supports command-line overrides

### File Structure

- `/input` - Contains the original Figma-exported design tokens
- `/temp` - Temporary directory for split token files
- `/build` - Output directory for transformed tokens
- `/lib` - Core library files
  - `buildBrands.mjs` - Handles multi-brand token generation
  - `buildStyleDictionaryConfig.mjs` - Creates style dictionary configs
  - `configManager.mjs` - Manages configuration settings
  - `platformConfigs.mjs` - Platform-specific configurations
  - `registerTransforms.mjs` - Registers all transforms
  - `/formats` - Custom output formats
  - `/transforms` - Custom token transformations
- `/scripts` - Build and utility scripts
  - `build-style-dictionary.mjs` - Main build script
  - `split-design-tokens.mjs` - Token splitting utility

### Error Handling

The codebase includes comprehensive error handling to provide clear messages when issues occur:

- Validates configuration before running
- Checks for existence of required files
- Verifies input/output paths
- Reports specific errors with meaningful messages
- Validates token data structure

### Extending the Codebase

To add new functionality:

1. **Add New Platform**: Add a platform config factory function in `platformConfigs.mjs`
2. **Add New Transform**: Create in `/transforms` and register in `registerTransforms.mjs`
3. **Add New Output Format**: Create in `/formats` and register in `registerTransforms.mjs`

### Customization

- Modify `token-config.js` to change which tokens are processed
- Update the platform configuration functions for different output formats
- Add new transformation functions for special token processing needs
