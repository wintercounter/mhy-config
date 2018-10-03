const path = require('path')
const { moduleHome } = require('../../../../')

module.exports.default = (rules) => {
	rules
	.find(({ use, test }) => test.toString() === '/\.jsx?$/')
	.use.push({
		loader: require.resolve('prettier-loader'),
		// force this loader to run first if it's not first in loaders list
		enforce: 'pre',
		// avoid running prettier on all the files!
		// use it only on your source code and not on dependencies!
		exclude: /node_modules/,
		options: require('../../../../prettier')
	})
	return rules
}