const { moduleHome } = require('../../')
const path = require('path')

module.exports.default = () => ({
	extensions : ['.js', '.mjs', '.jsx', '.css', '.scss', '.ts', '.tsx'],
	modules: Array.from(new Set([
		path.resolve(moduleHome, '../../../'),
		path.resolve(process.cwd(), 'node_modules'),
		'../node_modules'
	]))
})