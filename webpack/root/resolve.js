const { moduleHome } = require('../../')
const path = require('path')

module.exports.default = () => ({
	extensions : ['.js', '.mjs', '.css', '.scss'],
	modules: Array.from(new Set([
		path.resolve(moduleHome, '../../../'),
		path.resolve(process.cwd(), 'node_modules')
	]))
})