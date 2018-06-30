const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require('webpack');


const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        contentBase: './public',
        disableHostCheck: true,
        hot: true
    }
});