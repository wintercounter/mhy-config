import path from 'path'

import { load } from '../'

const tsconfig = module.exports = module.exports.default = load('typescript', {
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
		path.resolve(process.cwd(), 'src/**/*')
	]
})

// Generate fresh tsconfig.json on each run
require('../_utils/tsconfig')(process.cwd(), tsconfig)