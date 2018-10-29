const fs = require('fs')
const path = require('path')

const WebpackManifestPlugin = require('webpack-manifest-plugin')
const WebpackPwaManifestPlugin = require('webpack-pwa-manifest')
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');

// const { moduleHome } = require('../../')

const manifest = require('../../manifest')
// const defaultSwPath = path.resolve(moduleHome, '../../../../', 'src/sw.js')
// const projectSwPath = path.resolve(process.cwd(), 'src/sw.js')
// const swSrc = fs.existsSync(projectSwPath) ? projectSwPath : defaultSwPath

module.exports.default = (plugins = []) => {
    manifest.icons.map(icon => {
        const inCwdPath = path.resolve(process.cwd(), icon.src)
        if (fs.existsSync(inCwdPath)) {
            icon.src = inCwdPath
        }
        return icon
    })

	return plugins.concat([
	    new GenerateSW(),
        // new InjectManifest({ swSrc }),
        new WebpackPwaManifestPlugin(manifest),
		new WebpackManifestPlugin({
			fileName: './manifest.webpack.json',
		})
	])
}

