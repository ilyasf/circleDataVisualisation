const appSourcePath = __dirname + '/src';
const webpack = require('webpack');

module.exports = {
    context: appSourcePath,
    entry: './index.js',
    output: {
        path: appSourcePath,
        filename: 'bundle.js'
    },

    debug: true,

    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: [
                    appSourcePath
                ],
                query: {
                    presets: ['es2015'],
                }
            }, {
                test: /\.html$/,
                loader: 'raw',
                exclude: /node_modules/,
                include: [
                    appSourcePath
                ]
            }
        ]
    }
};