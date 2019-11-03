const PATH = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',                                           // точка входа - с какого файла начинаем собирать билд
    },
    output: {
        filename: '[name].js',                                          // имя для выходного файла будет браться из входного по именюи свойтсва в объекте entry
        path: PATH.resolve(__dirname, './dist'),                        // для того чтобы пути были корректными используем пакет path
        publicPath: '/dist',                                             // куда смотрит devserver
    },
    devServer: {
        compress: true,                                                // Включить сжатие gzip для всех файлов в папке dist для девсервера
        overlay: true,                                                 // вывод ошибок не в консоли, а на экране браузера
    },
    devtool: 'source-map',
    module: {
        rules: [                                                       // массив со списком правил для обработки различных типов файлов
            {
                test: /\.js$/,                                         // какой тип файлов будем обрабатывать в этом правлие
                loader: 'babel-loader',                                // каким обработчиком будем обрабатывать тип файлов из свойтсва test
                exclude: '/node_modules/',                             // файлы в каких папках нужно искгючить из обработки, можно также указывать отдельные файлы
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, 
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            path: '/dist',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ]
};