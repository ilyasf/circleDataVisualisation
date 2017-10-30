var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    debug: true,

    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, '..', 'src')
                ],
                query: {
                    presets: ['env'],
                }
            }, {
                test: /\.html$/,
                loader: 'raw',
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, '..', 'src')
                ]
            }, {
                test: /\.css$/,
                loaders: [ 'style-loader', 'css-loader' ]
            }, {
                test:/\.(png|jpe?g|gif)$/,
                exclude:/node_modules/,
                loader: 'url-loader?limit=1024&name=/assets/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'src', 'index.html'),
            filename: path.resolve(__dirname, '..', 'dist', 'index.html')
        })
    ]
};
