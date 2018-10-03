import path from 'path'

import { load } from '../'

module.exports = module.exports.default = load('typescript', {
	"compilerOptions": {
		"target": "esnext",
		"moduleResolution": "node",
		"allowJs": true,
		"noEmit": true,
		"strict": true,
		//"isolatedModules": true,
		"esModuleInterop": true
	},
	"include": [
		path.resolve(process.cwd(), 'src', '/')
	]
})