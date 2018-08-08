export default (defaults = []) => [
	...defaults,
	require.resolve('@babel/plugin-syntax-dynamic-import'),
	require.resolve('babel-plugin-transform-remove-strict-mode'),
	require.resolve('@babel/plugin-proposal-class-properties'),
	require.resolve('@babel/plugin-transform-object-assign'),
	[require.resolve('@babel/plugin-syntax-decorators'), {
		legacy: true
	}],
	require.resolve('babel-plugin-syntax-async-functions'),
	require.resolve('@babel/plugin-transform-regenerator'),
	require.resolve('babel-plugin-transform-function-bind'),
	require.resolve('@babel/plugin-proposal-export-default-from')
]