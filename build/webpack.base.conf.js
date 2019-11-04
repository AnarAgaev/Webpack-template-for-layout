const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
 };

module.exports = {
	// BASE config 
	externals: {
		paths: PATHS
	},
	entry: {
		app: PATHS.src,
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
				exclude: '/node_modules/',
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
		new HtmlWebpackPlugin ({
			hash: false,
			template: `${PATHS.src}/index.html`,
			filename: 'index.html',
			inject: true
		}),
		new CopyWebpackPlugin ([
			{ from: `${PATHS.src}/img`, to: 'img' },
			{ from: `${PATHS.src}/font`, to: 'font' },
			{ from: `${PATHS.src}/static`, to: '' }
		])
	]
};