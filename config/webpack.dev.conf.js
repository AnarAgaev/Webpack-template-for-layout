const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

/**
 * Webpack development configuration
 */
const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,
        port: 8081,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
        new CopyWebpackPlugin ([
    				{ from: `${PATHS.src}/img`, to: 'img' },
    				{ from: `${PATHS.src}/font`, to: 'font' },
    				{ from: `${PATHS.src}/static`, to: '' }
    		])
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
});
