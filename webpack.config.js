const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/js/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist/js'),
        publicPath: '/dist/js'
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true, // Enable gzip compression for everything served
        overlay: true // Show errors and warnings in the browser vewport
    },
    devtool: 'source-map', // source-paps
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            path: '/dist/*.*',
        }),
    ]
};