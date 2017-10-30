const webpack = require('webpack');
const path = require('path');
const config = require('./webpack');

module.exports = Object.assign({
        context: path.resolve(__dirname, 'src'),
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        }
    },
    config
);
