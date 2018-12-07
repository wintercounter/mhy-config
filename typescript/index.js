import path from 'path'
import gm from 'global-modules'
import fs from 'fs'
import { load } from '../'
import copydir from 'copy-dir'

const _1 = path.resolve(gm, '@mhy/mhy', 'node_modules', '@types')
const _2 = path.resolve('/home/node/.npm-global/lib/node_modules/@mhy/mhy/node_modules/@types')
const _3 = path.resolve(process.cwd(), 'node_modules', '@types')
const globalTypesPath = fs.existsSync(_1) ? _1 : _2

// Get aliases
let aliases
try {
    aliases = require('../webpack').default.resolve.alias
} catch (e) {
    aliases = {}
}
aliases = Object.entries(aliases)

// Copy types
if (fs.existsSync(_3)) {
    const isDirectory = source => fs.lstatSync(path.join(_3, source)).isDirectory()
    const getDirectories = source => fs.readdirSync(source).filter(isDirectory)

    getDirectories(_3).forEach(dir => {
        // If dir not exists in mhy
        if (!fs.existsSync(path.resolve(globalTypesPath, dir))) {
            copydir.sync(
                path.resolve(_3, dir),
                path.resolve(globalTypesPath, dir)
            )
        }
    })
}

const tsconfig = (module.exports = module.exports.default = load('typescript', {
    compilerOptions: {
        module: 'esNext',
        target: 'esnext',
        moduleResolution: 'node',
        allowJs: false,
        emitDeclarationOnly: true,
        strict: true,
        jsx: 'preserve',
        resolveJsonModule: true,
        esModuleInterop: true,
        noImplicitAny: false,
        declaration: true,
        typeRoots: [
            globalTypesPath
        ],
        baseUrl: path.resolve(process.cwd(), 'src'),
        paths: aliases.reduce(
            function(acc, [k]) {
                const folder = k.replace('@', ``)
                acc[k] = [`${folder}/index`]
                acc[`${k}/*`] = [`${folder}/*`]
                return acc
            },
            {
                '*': [
                    path.resolve(gm, '@mhy/mhy', 'node_modules', '*')
                ]
            }
        )
    },
    include: [path.resolve(process.cwd(), 'src/**/*')],
    files: [require.resolve('../../typescript/mhy.d.ts')]
}))

// Generate fresh tsconfig.json on each run
require('../_utils/tsconfig')(process.cwd(), tsconfig)
