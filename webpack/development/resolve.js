module.exports.default = resolve => ({
    ...resolve,
    unsafeCache: /node_modules|lib/
})
