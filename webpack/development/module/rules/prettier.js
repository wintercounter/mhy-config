const path = require('path')
const { moduleHome } = require('../../../../')

module.exports.default = (rules) => [
	...rules,
	{
		test: /\.[jt]sx?$/,
		include: Array.from(new Set([ // Make items unique
			path.join(moduleHome, 'src'),
			path.join(process.cwd(), 'src')
		])),
		loader: require.resolve('prettier-loader'),
		// force this loader to run first if it's not first in loaders list
		enforce: 'pre',
		// avoid running prettier on all the files!
		// use it only on your source code and not on dependencies!
		exclude: /node_modules/,
		options: require('../../../../prettier')
	}
]