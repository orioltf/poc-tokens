// filepath: /workspaces/poc-tokens/lib/registerTransforms.mjs
import StyleDictionary from 'style-dictionary'

import typescriptES6 from './formats/typescriptES6.mjs'
import colorGradient from './transforms/colorGradient.mjs'

/**
 * Registers all custom formats, transforms, and transform groups with Style Dictionary
 */
function registerTransforms() {
	// Register formats
	StyleDictionary.registerFormat(typescriptES6)

	// Register transforms
	StyleDictionary.registerTransform(colorGradient)

	// Register transform groups
	StyleDictionary.registerTransformGroup({
		name: 'custom/css',
		// this is to show one possibility for adding a few transforms to a pre-defined group
		// (however, we suggest to use the previous approach, which is more explicit and clear)
		// transforms: StyleDictionary.transformGroup['css'].concat(['size/px', 'ratio/%']),
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
}

export default registerTransforms
