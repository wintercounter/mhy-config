const getUse = (isModules = true) => [
	{
		loader: require.resolve('style-loader')
	},
	{
		loader: require.resolve('css-loader'),
		options: {
			importLoaders: 2,
			localIdentName: '[local]__[hash:base64:5]',
			sourceMap: true,
			modules: isModules,
			minimize: true,
			camelCase: true
		}
	},
	{
		loader: require.resolve('postcss-loader'),
		options: {
			sourceMap: true,
			plugins: [
				require('postcss-import')(),
				require('postcss-cssnext')()
			]
		}
	},
	{
		loader: require.resolve('sass-loader'),
		options: {
			sourceMap: true,
			includePaths: [
				'node_modules',
				'bower_components',
				'src'
			]
		}
	}
]

module.exports.default = rules => [
	...rules,
	{
		test: /^((?!global).)*.s?css$/,
		use: getUse()
	},
	{
		test: /\.global\.s?css$/,
		use: getUse(false)
	}
]