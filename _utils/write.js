const fs = require('fs')
const path = require('path')

module.exports = (dir, filename, src, json = false) => {
    src = JSON.stringify(src, null, 2)
    return fs.writeFile(
        path.resolve(dir, filename),
        json ? src : `module.exports = module.exports.default = ${src}`,
        'utf-8',
        function(err) {
            err && console.error(err)
        }
    )
}
