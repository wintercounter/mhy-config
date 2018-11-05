const write = require('./write')

module.exports = (dir, tsconfig) =>
    write(dir, 'tsconfig.json', tsconfig, true)