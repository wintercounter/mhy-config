const loaders = ['css-loader', 'sass-loader', 'postcss-loader']

module.exports.default = rules => {
    rules.forEach(({ use }) => {
        Array.isArray(use) &&
            use.forEach(u => {
                loaders.forEach(l => {
                    if (u.loader.includes(l)) {
                        u.options.sourceMaps = false
                    }
                })
            })
    })
    return rules
}
