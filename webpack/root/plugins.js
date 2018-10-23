const fs = require('fs')
const path = require('path')

const WebpackManifestPlugin = require('webpack-manifest-plugin')
const WebpackPwaManifestPlugin = require('webpack-pwa-manifest')

const manifest = require('../../manifest')

module.exports.default = (plugins = []) => {
    manifest.icons.map(icon => {
        const inCwdPath = path.resolve(process.cwd(), icon.src)
        if (fs.existsSync(inCwdPath)) {
            icon.src = inCwdPath
        }
        return icon
    })

	return plugins.concat([
        new WebpackPwaManifestPlugin(manifest),
		new WebpackManifestPlugin({
			fileName: './manifest.webpack.json',
		})
	])
}

