module.exports.default = (rules) => [
    ...rules,
    {
        test: /\.tsx?$/,
        loader: require.resolve('awesome-typescript-loader')
    }
]