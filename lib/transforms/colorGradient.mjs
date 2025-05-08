/**
 * @fileoverview
 * Color Gradient Transform Module
 *
 * This module provides a custom transform for Style Dictionary that converts gradient token
 * definitions into CSS gradient syntax. It handles linear, radial, angular, and conic gradients
 * with customizable angles and color stops.
 *
 * The transform:
 * - Detects tokens with type 'gradient'
 * - Processes angle, type and stops properties
 * - Converts color values to RGB strings with proper alpha channel support
 * - Generates a standard CSS gradient string with proper syntax
 */

import Color from 'tinycolor2'

/**
 * @typedef {import('style-dictionary').Transform} Transform
 */

/**
 * Color gradient transform for Style Dictionary tokens.
 * Converts gradient definition objects into CSS gradient syntax strings.
 *
 * @type {Transform}
 */
const colorGradient = {
	filter: (token, options) => {
		return (options.usesDtcg ? token.$type : token.type) === 'gradient'
	},
	name: 'color/gradient', // notice: the name is an override of an existing predefined method (yes, you can do it)
	transform: function (token, _, options) {
		const val = options.usesDtcg ? token.$value : token.value
		const { angle, stops } = val
		let { type } = val

		if (typeof type === 'undefined') {
			type = 'linear'
		}

		if (type !== 'linear' && type !== 'radial' && type !== 'angular' && type !== 'conic') {
			throw new Error(`Invalid gradient type: ${type}. It should be either 'linear' or 'radial' or 'angular' or 'conic'.`)
		}

		if (typeof angle !== 'number') {
			throw new Error(`Invalid gradient angle type: ${typeof angle}. It should be a number.`)
		}

		let ret = `${type}-gradient(${angle}deg`

		stops.forEach(({ alpha, color, position }) => {
			if (typeof alpha !== 'undefined' && typeof alpha !== 'number') {
				throw new Error(`Invalid gradient alpha type: ${typeof alpha}. It should be a number.`)
			}

			const col = Color(color)
			if (typeof alpha !== 'undefined') {
				col.setAlpha(alpha)
			}
			ret += `, ${col.toRgbString()} ${position}`
		})

		ret += `)`

		return ret
	},
	transitive: true,
	type: 'value',
}

export default colorGradient
