const path = require('path')
const fs = require('fs')

const babelrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc'), 'utf8'))
babelrc.presets.find(([name]) => name.includes('preset-env'))[1].modules = 'commonjs'
babelrc.plugins.push(require.resolve('babel-plugin-dynamic-import-node'))
module.exports = require('babel-jest').createTransformer(babelrc)