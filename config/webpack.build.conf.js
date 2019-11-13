const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist')
};

/**
 * Webpack build configuration
 */
const buildWebpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin({
			path: baseWebpackConfig.externals.paths.dist,
		}),
		new CopyWebpackPlugin ([
				{ from: `${PATHS.src}/img`, to: 'img' },
				{ from: `${PATHS.src}/font`, to: 'font' },
				{ from: `${PATHS.src}/static`, to: '' }
		]),
		new ImageminPlugin({
				disable: process.env.NODE_ENV === 'production',
				test: /\.(jpe?g|png|gif|svg)$/i,
				optipng: {
						optimizationLevel: 7
				},
				pngquant: {
						speed: 1,
						strip: true,
				},
				gifsicle: {
					 optimizationLevel: 1
				},
				plugins: [
						imageminMozjpeg({
								quality: 85,
								progressive: true
						})
				]
		}),
	]
});

module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig);
});
