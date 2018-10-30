import path from 'path'

import { load } from '..'

module.exports = module.exports.default = load('typescript', {
	compilerOptions: {
		moduleResolution: 'node',
		allowJs: true,
		noEmit: true,
		strict: true,
		esModuleInterop: true,
		outDir: path.resolve(process.cwd(), 'dist'),
		sourceMap: true,
		noImplicitAny: true,
		module: 'commonjs',
		target: 'es5',
		jsx: 'react'
	},
	include: [
		path.resolve(process.cwd(), 'src', 'index.tsx')
	]
})