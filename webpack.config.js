let path = require("path");
const webpack = require('webpack');


module.exports = {
    entry: {
        client: ['./client/src/index.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './client/dist'),
        publicPath: "/"
    },

    module: {
        rules: [{
            exclude: /(node_modules)/,
            test: /\.jsx?$/,
            use: 'babel-loader',

        }]
    },
    devtool: "source-map",
    plugins: [
        new webpack.NamedModulesPlugin()

    ],
    devServer: {
        contentBase: './public'
    }

};