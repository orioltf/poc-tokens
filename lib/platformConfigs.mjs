/**
 * @fileoverview
 * Platform Configuration Factory
 *
 * This module provides factory functions for creating platform-specific configurations
 * used by Style Dictionary. It centralizes platform configuration creation to reduce
 * duplication and standardize output formats across the codebase.
 *
 * Each factory function follows a consistent pattern, taking a brand name and build path
 * prefix to create fully configured platform objects with appropriate transformations,
 * file outputs, and format settings.
 *
 * The module supports all major platform targets including:
 * - CSS/Web
 * - JavaScript/TypeScript
 * - JSON
 * - iOS (Swift & Objective-C)
 * - Android
 * - Compose (Kotlin)
 */

/**
 * Creates an Android platform configuration
 *
 * Configures Android resource outputs (colors.xml, resources.xml) for design tokens
 * with appropriate type filtering and file organization.
 *
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} Android platform configuration
 */
export function createAndroidPlatform(brand, buildPathPrefix) {
	return {
		buildPath: `${buildPathPrefix}/${brand}/android/`,
		files: [
			{
				destination: 'tokens.colors.xml',
				filter: { $type: 'color' },
				format: 'android/colors',
			},
			{
				destination: 'tokens.gradients.xml',
				filter: { $type: 'gradient' },
				format: 'android/colors',
			},
			{
				destination: 'tokens.dimensions.xml',
				filter: { $type: 'dimension' },
				format: 'android/resources',
			},
			{
				destination: 'tokens.font_dimensions.xml',
				filter: { $type: 'dimension' },
				format: 'android/resources',
			},
			{
				destination: 'tokens.shadows.xml',
				filter: { $type: 'shadow' },
				format: 'android/resources',
			},
			{
				destination: 'tokens.durations.xml',
				filter: { $type: 'duration' },
				format: 'android/resources',
			},
		],
		transformGroup: 'android',
	}
}

/**
 * Creates a Compose platform configuration
 *
 * Configures Kotlin Compose output for design tokens with
 * appropriate type filtering and file organization.
 *
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} Compose platform configuration
 */
export function createComposePlatform(brand, buildPathPrefix) {
	return {
		buildPath: `${buildPathPrefix}/${brand}/compose/`,
		files: [
			{
				destination: 'StyleDictionaryColor.kt',
				filter: { $type: 'color' },
				format: 'compose/object',
				options: {
					className: 'StyleDictionaryColor',
					packageName: 'StyleDictionaryColor',
				},
			},
			{
				destination: 'StyleDictionaryGradient.kt',
				filter: { $type: 'gradient' },
				format: 'compose/object',
				options: {
					className: 'StyleDictionaryGradient',
					packageName: 'StyleDictionaryGradient',
				},
			},
			{
				destination: 'StyleDictionaryDimension.kt',
				filter: { $type: 'dimension' },
				format: 'compose/object',
				options: {
					className: 'StyleDictionaryDimension',
					packageName: 'StyleDictionaryDimension',
					type: 'float',
				},
			},
			{
				destination: 'StyleDictionaryShadow.kt',
				filter: { $type: 'shadow' },
				format: 'compose/object',
				options: {
					className: 'StyleDictionaryShadow',
					packageName: 'StyleDictionaryShadow',
				},
			},
			{
				destination: 'StyleDictionaryDuration.kt',
				filter: { $type: 'duration' },
				format: 'compose/object',
				options: {
					className: 'StyleDictionaryDuration',
					packageName: 'StyleDictionaryDuration',
				},
			},
		],
		transformGroup: 'compose',
	}
}

/**
 * Creates a CSS platform configuration
 *
 * Configures CSS variable output for design tokens with appropriate type filtering
 * and file organization.
 *
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} CSS platform configuration
 */
export function createCssPlatform(brand, buildPathPrefix) {
	return {
		buildPath: `${buildPathPrefix}/${brand}/css/`,
		files: [
			{
				destination: 'tokens.css',
				filter: { $type: 'color' },
				format: 'css/variables',
				options: { outputReferences: true },
			},
			{
				destination: 'gradients.css',
				filter: { $type: 'gradient' },
				format: 'css/variables',
			},
			{
				destination: 'dimensions.css',
				filter: { $type: 'dimension' },
				format: 'css/variables',
			},
			{
				destination: 'shadows.css',
				filter: { $type: 'shadow' },
				format: 'css/variables',
			},
			{
				destination: 'durations.css',
				filter: { $type: 'duration' },
				format: 'css/variables',
			},
		],
		transformGroup: 'custom/css',
	}
}

/**
 * Creates an iOS platform configuration
 *
 * Configures Objective-C output for iOS design tokens with
 * appropriate type filtering and file organization.
 *
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} iOS platform configuration
 */
export function createIosPlatform(brand, buildPathPrefix) {
	return {
		buildPath: `${buildPathPrefix}/${brand}/ios/`,
		files: [
			{
				destination: 'tokens.h',
				format: 'ios/macros',
			},
			{
				destination: 'StyleDictionaryColor.h',
				filter: { $type: 'color' },
				format: 'ios/colors.h',
				options: {
					className: 'StyleDictionaryColor',
					type: 'StyleDictionaryColorName',
				},
			},
			{
				destination: 'StyleDictionaryColor.m',
				filter: { $type: 'color' },
				format: 'ios/colors.m',
				options: {
					className: 'StyleDictionaryColor',
					type: 'StyleDictionaryColorName',
				},
			},
			{
				destination: 'StyleDictionaryDimension.h',
				filter: { $type: 'dimension' },
				format: 'ios/static.h',
				options: {
					className: 'StyleDictionaryDimension',
					type: 'float',
				},
			},
			{
				destination: 'StyleDictionaryDimension.m',
				filter: { $type: 'dimension' },
				format: 'ios/static.m',
				options: {
					className: 'StyleDictionaryDimension',
					type: 'float',
				},
			},
		],
		transformGroup: 'ios',
	}
}

/**
 * Creates an iOS Swift platform configuration
 *
 * Configures Swift output for iOS design tokens as classes, enums and structs.
 *
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} iOS Swift platform configuration
 */
export function createIosSwiftPlatform(brand, buildPathPrefix) {
	return {
		buildPath: `${buildPathPrefix}/${brand}/ios-swift/`,
		files: [
			{
				destination: 'StyleDictionary+Class.swift',
				format: 'ios-swift/class.swift',
				options: {
					className: 'StyleDictionaryClass',
				},
			},
			{
				destination: 'StyleDictionary+Enum.swift',
				format: 'ios-swift/enum.swift',
				options: {
					className: 'StyleDictionaryEnum',
				},
			},
			{
				destination: 'StyleDictionary+Struct.swift',
				format: 'ios-swift/any.swift',
				options: {
					accessControl: 'internal',
					className: 'StyleDictionaryStruct',
					imports: 'SwiftUI',
					objectType: 'struct',
				},
			},
		],
		transformGroup: 'ios-swift',
	}
}

/**
 * Creates an iOS Swift with separate enums platform configuration
 *
 * Configures Swift output with token types separated into distinct enum files.
 *
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} iOS Swift Separate Enums platform configuration
 */
export function createIosSwiftSeparateEnumsPlatform(brand, buildPathPrefix) {
	return {
		buildPath: `${buildPathPrefix}/${brand}/ios-swift/`,
		files: [
			{
				destination: 'StyleDictionaryColor.swift',
				filter: { $type: 'color' },
				format: 'ios-swift/enum.swift',
				options: {
					className: 'StyleDictionaryColor',
				},
			},
			{
				destination: 'StyleDictionaryGradient.swift',
				filter: { $type: 'gradient' },
				format: 'ios-swift/enum.swift',
				options: {
					className: 'StyleDictionaryGradient',
				},
			},
			{
				destination: 'StyleDictionaryDimension.swift',
				filter: { $type: 'dimension' },
				format: 'ios-swift/enum.swift',
				options: {
					className: 'StyleDictionaryDimension',
				},
			},
			{
				destination: 'StyleDictionaryShadow.swift',
				filter: { $type: 'shadow' },
				format: 'ios-swift/enum.swift',
				options: {
					className: 'StyleDictionaryShadow',
				},
			},
			{
				destination: 'StyleDictionaryDuration.swift',
				filter: { $type: 'duration' },
				format: 'ios-swift/enum.swift',
				options: {
					className: 'StyleDictionaryDuration',
				},
			},
		],
		transformGroup: 'ios-swift-separate',
	}
}

/**
 * Creates a JSON platform configuration
 *
 * Configures JSON output (flat and nested) for design tokens with
 * appropriate type filtering and file organization.
 *
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} JSON platform configuration
 */
export function createJsonPlatform(brand, buildPathPrefix) {
	return {
		buildPath: `${buildPathPrefix}/${brand}/json/`,
		files: [
			{
				destination: 'tokens.json',
				filter: { $type: 'color' },
				format: 'json',
				options: { outputReferences: true },
			},
			{
				destination: 'tokensNested.json',
				filter: { $type: 'color' },
				format: 'json/nested',
				options: { outputReferences: true },
			},
			{
				destination: 'gradients.json',
				filter: { $type: 'gradient' },
				format: 'json',
				options: { outputReferences: true },
			},
			{
				destination: 'gradientsNested.json',
				filter: { $type: 'gradient' },
				format: 'json/nested',
				options: { outputReferences: true },
			},
			{
				destination: 'dimensions.json',
				filter: { $type: 'dimension' },
				format: 'json',
				options: { outputReferences: true },
			},
			{
				destination: 'dimensionsNested.json',
				filter: { $type: 'dimension' },
				format: 'json/nested',
				options: { outputReferences: true },
			},
			{
				destination: 'shadows.json',
				filter: { $type: 'shadow' },
				format: 'json',
				options: { outputReferences: true },
			},
			{
				destination: 'shadowsNested.json',
				filter: { $type: 'shadow' },
				format: 'json/nested',
				options: { outputReferences: true },
			},
			{
				destination: 'durations.json',
				filter: { $type: 'duration' },
				format: 'json',
				options: { outputReferences: true },
			},
			{
				destination: 'durationsNested.json',
				filter: { $type: 'duration' },
				format: 'json/nested',
				options: { outputReferences: true },
			},
		],
		transforms: ['attribute/cti'],
	}
}

/**
 * Creates a JavaScript platform configuration
 *
 * Configures JavaScript and TypeScript output for design tokens with
 * appropriate type filtering and file organization.
 *
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} JavaScript platform configuration
 */
export function createJsPlatform(brand, buildPathPrefix) {
	return {
		basePxFontSize: 16,
		buildPath: `${buildPathPrefix}/${brand}/js/`,
		files: [
			{
				destination: 'tokens.js',
				filter: { $type: 'color' },
				format: 'javascript/es6',
				options: { outputReferences: true },
			},
			{
				destination: 'tsTokens.ts',
				filter: { $type: 'color' },
				format: 'typescript/es6',
				options: { outputReferences: true },
			},
			{
				destination: 'gradients.js',
				filter: { $type: 'gradient' },
				format: 'javascript/es6',
			},
			{
				destination: 'tsGradients.ts',
				filter: { $type: 'gradient' },
				format: 'typescript/es6',
			},
			{
				destination: 'dimensions.js',
				filter: { $type: 'dimension' },
				format: 'javascript/es6',
			},
			{
				destination: 'tsDimensions.ts',
				filter: { $type: 'dimension' },
				format: 'typescript/es6',
			},
			{
				destination: 'shadows.js',
				filter: { $type: 'shadow' },
				format: 'javascript/es6',
			},
			{
				destination: 'tsShadows.ts',
				filter: { $type: 'shadow' },
				format: 'typescript/es6',
			},
			{
				destination: 'durations.js',
				filter: { $type: 'duration' },
				format: 'javascript/es6',
			},
			{
				destination: 'tsDurations.ts',
				filter: { $type: 'duration' },
				format: 'typescript/es6',
			},
		],
		transformGroup: 'custom/js',
	}
}

/**
 * Creates a Web (SCSS) platform configuration
 *
 * Configures SCSS variable output for design tokens with appropriate
 * type filtering and file organization.
 *
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} Web platform configuration
 */
export function createWebPlatform(brand, buildPathPrefix) {
	return {
		buildPath: `${buildPathPrefix}/${brand}/web/`,
		files: [
			{
				destination: 'tokens.scss',
				filter: { $type: 'color' },
				format: 'scss/variables',
			},
			{
				destination: 'gradients.scss',
				filter: { $type: 'gradient' },
				format: 'scss/variables',
			},
			{
				destination: 'dimensions.scss',
				filter: { $type: 'dimension' },
				format: 'scss/variables',
			},
			{
				destination: 'shadows.scss',
				filter: { $type: 'shadow' },
				format: 'scss/variables',
			},
			{
				destination: 'durations.scss',
				filter: { $type: 'duration' },
				format: 'scss/variables',
			},
		],
		transformGroup: 'web',
	}
}

/**
 * Returns all platform configurations for a given brand
 *
 * Creates a map of platform configurations for all supported platforms,
 * using each platform's dedicated factory function.
 *
 * @param {string} brand - The brand name
 * @param {string} buildPathPrefix - The build path prefix
 * @returns {Object} All platform configurations keyed by platform name
 */
export function getAllPlatforms(brand, buildPathPrefix) {
	return {
		android: createAndroidPlatform(brand, buildPathPrefix),
		compose: createComposePlatform(brand, buildPathPrefix),
		css: createCssPlatform(brand, buildPathPrefix),
		ios: createIosPlatform(brand, buildPathPrefix),
		'ios-swift': createIosSwiftPlatform(brand, buildPathPrefix),
		'ios-swift-separate-enums': createIosSwiftSeparateEnumsPlatform(brand, buildPathPrefix),
		js: createJsPlatform(brand, buildPathPrefix),
		json: createJsonPlatform(brand, buildPathPrefix),
		web: createWebPlatform(brand, buildPathPrefix),
	}
}

export default {
	createAndroidPlatform,
	createComposePlatform,
	createCssPlatform,
	createIosPlatform,
	createIosSwiftPlatform,
	createIosSwiftSeparateEnumsPlatform,
	createJsonPlatform,
	createJsPlatform,
	createWebPlatform,
	getAllPlatforms,
}
