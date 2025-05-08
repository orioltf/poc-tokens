/**
 * @fileoverview
 * Configuration Manager
 *
 * This module provides a centralized configuration management system for the token pipeline.
 * It handles loading, validating, and providing access to configuration settings across
 * various parts of the application, ensuring consistent configuration access.
 *
 * The ConfigManager consolidates configuration from multiple sources:
 * - Default configurations defined in this file
 * - User configuration from token-config.js in the project root
 * - Environment variables
 *
 * It provides specialized configurations for different aspects of the token pipeline:
 * - Split configuration for token splitting
 * - Build configuration for Style Dictionary
 * - Platform-specific configurations
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Configuration manager for token processing
 * Centralizes and standardizes configuration handling across the application
 */
class ConfigManager {
	constructor() {
		this.config = {
			brands: ['dxn-default', 'zrh-default'],
			// Default configuration
			buildPathPrefix: path.join(__dirname, '..', 'build'),
			excludeKeys: [],
			includeKeys: [],
			inputFile: 'design-tokens.json',
			platforms: ['css', 'js', 'json'],
			sourcePathPrefix: path.join(__dirname, '..', 'input'),
			tempDir: path.join(__dirname, '..', 'temp'),
		}
	}

	/**
	 * Gets the brand and platform configuration
	 * @returns {Object} - Brand and platform configuration
	 */
	getBrandPlatformConfig() {
		return {
			brands: this.config.brands,
			buildPathPrefix: this.config.buildPathPrefix,
			platforms: this.config.platforms,
			tempDir: this.config.tempDir,
		}
	}

	/**
	 * Get full path to the input file
	 * @returns {string} - Full path to the input file
	 */
	getInputFilePath() {
		return path.join(this.config.sourcePathPrefix, this.config.inputFile)
	}

	/**
	 * Gets the configuration for token splitting
	 * @returns {Object} - Configuration for token splitting
	 */
	getSplitConfig() {
		const validation = this.validateSplitConfig()
		if (!validation.valid) {
			throw new Error(validation.message)
		}

		return {
			excludeKeys: this.config.excludeKeys,
			includeKeys: this.config.includeKeys,
			inputFile: this.getInputFilePath(),
			outputDir: this.config.tempDir,
		}
	}

	/**
	 * Loads configuration from a file and merges with defaults
	 * @param {string} configPath - Path to the configuration file
	 * @returns {Promise<Object>} - The merged configuration
	 */
	async loadFromFile(configPath) {
		try {
			const fileConfig = (await import(configPath)).default
			this.mergeConfig(fileConfig)
			return this.config
		} catch {
			console.log(`No configuration file found at ${configPath}, using defaults`)
			return this.config
		}
	}

	/**
	 * Merges provided configuration with current configuration
	 * @param {Object} newConfig - Configuration to merge
	 * @returns {Object} - The merged configuration
	 */
	mergeConfig(newConfig) {
		if (!newConfig) return this.config

		// Merge top-level properties
		Object.keys(newConfig).forEach((key) => {
			if (key in this.config) {
				this.config[key] = newConfig[key]
			}
		})

		return this.config
	}

	/**
	 * Validates the configuration for token splitting
	 * @returns {Object} - Validation result with status and message
	 */
	validateSplitConfig() {
		const { excludeKeys, includeKeys } = this.config

		if (includeKeys.length > 0 && excludeKeys.length > 0) {
			return {
				message: 'Cannot specify both includeKeys and excludeKeys. Choose one approach.',
				valid: false,
			}
		}

		return { valid: true }
	}
}

export default ConfigManager
