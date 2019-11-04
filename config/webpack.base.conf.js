const path                 = require('path'),
	  fs                   = require('fs'),
	  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	  CopyWebpackPlugin    = require('copy-webpack-plugin'),
	  HtmlWebpackPlugin    = require('html-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist')
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`,
	  PAGES     = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

/**
 * Webpack base configuration
 */
module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		main: PATHS.src,
	},
	output: {
		filename: 'js/[name].[hash].js',
		path: PATHS.dist,
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader'
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			},
			{
				test: /\.(css|scss|sass)$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: `${PATHS.src}/postcss.config.js`
							}
						}
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				]
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin ({
			filename: 'css/[name].[hash].css',
		}),
		new CopyWebpackPlugin ([
			{ from: `${PATHS.src}/img`, to: 'img' },
			{ from: `${PATHS.src}/font`, to: 'font' },
			{ from: `${PATHS.src}/static`, to: '' }
		]),
		...PAGES.map(page => new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/${page}`,
			filename: `./${page.replace(/\.pug/, '.html')}`
		}))
	]
};