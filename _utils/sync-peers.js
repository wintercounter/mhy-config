const fs = require('fs')
const path = require('path')
const { dependencies } = require(require('resolve-global')('@mhy/mhy/package.json'))
const packageJSON = require(path.resolve(__dirname, '../package.json'))

packageJSON.peerDependencies = dependencies
delete packageJSON.peerDependencies['@mhy/config']
fs.writeFile(path.resolve(__dirname, '../package.json'), JSON.stringify(packageJSON, null, 2), 'utf8', err => err && console.error(err))