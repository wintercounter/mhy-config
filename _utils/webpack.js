const write = require('./write')

module.exports = (dir, src) => write(dir, 'webpack.config.js', src, false)
