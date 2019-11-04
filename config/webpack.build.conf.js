const merge                = require('webpack-merge'),
      baseWebpackConfig    = require('./webpack.base.conf'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin');

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