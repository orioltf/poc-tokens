// @ts-check
import css from '@eslint/css'
import eslintJs from '@eslint/js'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import html from 'eslint-plugin-html'
import jsdoc from 'eslint-plugin-jsdoc'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	// config with just ignores is the replacement for `.eslintignore`
	{ ignores: ['**/build/**', '**/dist/**', '**/.history/**', 'package-lock.json'] },

	// React version detection: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md#configuration
	{ settings: { react: { version: 'detect' } } },

	// default configuration settings, partially previously built directly into ESLint
	{ extends: [eslintJs.configs.recommended], files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,mjsx,mtsx}'], plugins: { eslintJs } },

	// Includes recommended configuration settings for React: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/configs/recommended.js
	// Includes recommended configuration settings for Perfectionist: https://perfectionist.dev/configs/recommended-natural
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,mjsx,mtsx}'],
		// ...eslintPluginReact.configs.flat.recommended,
		...perfectionist.configs['recommended-natural'],
		languageOptions: {
			// ...eslintPluginReact.configs.flat.recommended.languageOptions,
			...perfectionist.configs['recommended-natural'].languageOptions,
			ecmaVersion: 'latest',
			globals: { ...globals.browser, ...globals.node, ...globals.serviceworker },
			sourceType: 'module',
		},
		plugins: {
			// ...eslintPluginReact.configs.flat.recommended.plugins,
			jsdoc,
			...perfectionist.configs['recommended-natural'].plugins,
		},
		rules: {
			// ...eslintPluginReact.configs.flat.recommended.rules,
			...perfectionist.configs['recommended-natural'].rules,
			'jsdoc/check-values': 'error',
			'jsdoc/require-description': 'error',
		},
	},

	// eslintReactHooks.configs['recommended-latest'], // recommended configuration settings for React Hooks

	// TypeScript Linting
	{
		extends: [
			eslintJs.configs.recommended,
			tseslint.configs.recommendedTypeChecked,
			tseslint.configs.stylisticTypeChecked,
			// eslintReact.configs['recommended-typescript'],
		],
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				// Configure Language Service Integration (Optional)
				// https://eslint-react.xyz/docs/getting-started/typescript#configure-language-service-integration-optional
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'@eslint-react/no-class-component': 'error',
			'@typescript-eslint/no-floating-promises': 'error',
		},
	},

	// disable type-aware linting on JS files
	{ extends: [tseslint.configs.disableTypeChecked], files: ['**/*.{js,mjs,cjs,jsx,mjsx,json,jsonc,json5,md,css,html}'] },

	// JSON Linting
	{ extends: [json.configs.recommended], files: ['**/*.json'], language: 'json/jsonc', plugins: { json } },
	{ extends: [json.configs.recommended], files: ['**/*.jsonc'], language: 'json/jsonc', plugins: { json } },
	{ extends: [json.configs.recommended], files: ['**/*.json5'], language: 'json/jsonc', plugins: { json } },

	// Markdown Linting
	{ extends: [markdown.configs.recommended], files: ['**/*.md'], language: 'markdown/gfm', plugins: { markdown } },

	// CSS Linting
	{ extends: [css.configs.recommended], files: ['**/*.css'], language: 'css/css', plugins: { css } },

	// HTML Linting
	{ files: ['**/*.html'], language: 'html/html', plugins: { html }, settings: { 'html/indent': 'tab' } },

	// Must be last
	// ships with an eslint-plugin-prettier/recommended config that sets up both eslint-plugin-prettier and eslint-config-prettier in one got
	eslintPluginPrettierRecommended // recommended configuration settings for Prettier
)
