const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * Webpack build configuration
 */
const buildWebpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin({
			path: baseWebpackConfig.externals.paths.dist,
		})
	]
});

module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig);
});