const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports.default = (plugins = []) => {
	return plugins.concat([
		new ManifestPlugin({
			fileName: './build/manifest.json',
		})
	])
}

