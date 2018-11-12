const babelrc = require('../babel')
const write = require('./write')

module.exports = dir => write(dir, '.babelrc', babelrc, true)
