# poc-tokens

[![Build Style Dictionary](https://github.com/FZAG/poc-tokens/actions/workflows/build-style-dictionary.yml/badge.svg)](https://github.com/FZAG/poc-tokens/actions/workflows/build-style-dictionary.yml)

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
# Split design tokens into brand-specific files
npm run split-tokens

# Build all style dictionaries
npm run build
```

### GitHub Action Workflow

This repository includes a GitHub Actions workflow that automatically builds and publishes design tokens whenever changes are made. The workflow:

1. Triggers when token-related files are changed in the main branch
2. Builds style dictionaries using the npm build script
3. Commits the generated files back to the repository
4. Provides build artifacts for download
5. Can optionally create a GitHub release with versioning

#### Manual Triggering

You can manually trigger the workflow from the Actions tab in GitHub:

1. Go to the Actions tab in the repository
2. Select "Build Style Dictionary" workflow
3. Click "Run workflow"
4. Choose options:
   - Branch to build from (default: main)
   - Whether to create a release (optional)
   - Version bump type (patch/minor/major) if creating a release

#### Consuming Generated Tokens

##### NPM Package

To use the tokens in another project:

```bash
# Install from GitHub repository
npm install github:orioltf/poc-tokens

# Or if published to npm registry
npm install poc-tokens
```

##### Direct Files

You can also directly access the generated files in the `build` directory:

- `build/{brand}/{platform}` - Contains the files for each brand and platform
- For example: `build/dxn-default/css/variables.css` for DXN CSS variables

##### Import Examples

CSS:

```css
@import 'poc-tokens/build/dxn-default/css/variables.css';

.my-component {
	color: var(--color-primary);
}
```

JavaScript:

```javascript
import tokens from 'poc-tokens/build/dxn-default/js/tokens.js'

const primaryColor = tokens.color.primary
```

React:

```jsx
import { ThemeProvider } from 'styled-components'
import tokens from 'poc-tokens/build/dxn-default/js/tokens.js'

function App() {
	return (
		<ThemeProvider theme={tokens}>
			<YourApp />
		</ThemeProvider>
	)
}
```

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

## Local testing of Github Actions

You can test GitHub Actions locally before pushing to GitHub. The most popular and widely recommended tool for this purpose is `nektos/act`.

### Install dependencies

Make sure you have the necessary dependencies:

```bash
brew install gh act
```

This installs:

1. **`gh`**: Github CLI
2. **`act`**: Nektos/act CLI that will allow you to test the Github actions locally

Setup `gh`:

```bash
gh auth login
```

Questions and answers:

```bash
? Where do you use GitHub? GitHub.com
? What is your preferred protocol for Git operations on this host? HTTPS
? Authenticate Git with your GitHub credentials? Yes
? How would you like to authenticate GitHub CLI? Login with a web browser

! First copy your one-time code: ****-****
Press Enter to open https://github.com/login/device in your browser...
✓ Authentication complete.
- gh config set -h github.com git_protocol https
✓ Configured git protocol
✓ Logged in as **********
```

### How to Test GitHub Actions Locally

`nektos/act` is an open-source CLI tool that allows you to run your GitHub Actions workflows locally using Docker containers. It reads your workflow files from the `.github/workflows/` directory and emulates the GitHub Actions runner environment, executing jobs and steps as they would run on GitHub.

### Key Features

- **Fast feedback**: You can iterate and debug workflows without needing to commit and push every change, saving significant time and avoiding unnecessary commits.
- **Docker-based**: Act uses Docker to create containers that mimic the GitHub Actions environment. This helps ensure that your workflows behave the same locally as they would on GitHub.
- **Flexible execution**: You can run entire workflows, individual jobs, or specific steps, allowing for targeted testing and debugging.

## How to Use Act

1. **Install Docker** on your local machine (required for Act to run workflows in containers).
1. **Install Act**: You can install it via Homebrew, downloading a release, or building from source as described in the [official documentation](https://github.com/nektos/act).
1. **Run Act**: In your project directory, simply run act. By default, this will execute the default workflow for the default event (usually push). You can specify different events or workflow files as needed.

### Example

```bash
# Run the default workflow for the push event
# If no event name passed, will default to "on: push"
# If actions handles only one event it will be used as default instead of "on: push"
act

# Run act in macOS if you encounter errors
act --container-architecture linux/amd64

# Run a specific workflow file for a pull_request event
act pull_request -W .github/workflows/build-style-dictionary.yml
```

### Run the Github action in this repo

```bash
act --container-architecture linux/amd64 -s GITHUB_TOKEN="$(gh auth token)"
```
