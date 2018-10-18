module.exports.default = (rules) => [
    ...rules,
    {
        test: /\.svgx$/,
        use: [
            {
                test: /\.svgx$/,
                use: {
                    loader: require.resolve('svg-react-loader')
                }
            }
        ]
    }
]