const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => !fileName.includes('.'));

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
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}/index.pug`,
            filename: `./${page}.html`
        }))
    ]
};