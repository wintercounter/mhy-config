import path from 'path'
import rg from 'resolve-global'

import { load } from '../'

let aliases
try {
    aliases = require('../webpack').default.resolve.alias
} catch (e) {
    aliases = {}
}
aliases = Object.entries(aliases)

const tsconfig = module.exports = module.exports.default = load('typescript', {
	"compilerOptions": {
		"module": "esNext",
		"target": "esnext",
		"moduleResolution": "node",
		"allowJs": true,
		"noEmit": true,
		"strict": true,
    	"jsx": "preserve",
    	"resolveJsonModule": true,
		"esModuleInterop": true,
    	"noImplicitAny": false,
		"typeRoots": [
	    		path.resolve(process.cwd(), 'node_modules', '@types'),
		    	path.resolve(rg('@mhy/mhy'), '../../', 'node_modules', '@types')
		],
		"baseUrl": path.resolve(process.cwd(), 'src'),
		"paths": aliases.reduce(function (acc, [k]) {
			const folder = k.replace('@', ``)
		    	acc[k] = [`${folder}/index`]
		    	acc[`${k}/*`] = [`${folder}/*`]
		    	return acc
        	}, {
			'*': [
				path.resolve(rg('@mhy/mhy'), '../../', 'node_modules', '*'),
				path.resolve(rg('@mhy/mhy'), '../../', 'node_modules', '@types', '*')
			]
		})
	},
	/*"exclude": [
	"node_modules",
	"!node_modules/@types"
	],*/
	"include": [
		path.resolve(process.cwd(), 'src/**/*')
	]
})

// Generate fresh tsconfig.json on each run
require('../_utils/tsconfig')(process.cwd(), tsconfig)
