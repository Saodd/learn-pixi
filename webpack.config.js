const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.ts',
    },
    output: {
        filename:  '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Learn Pixi - Lewin"
        })
    ],
    mode: "production",
    // devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(js|ts)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "ts-loader",
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                },
            },
        },
    },
    performance: {
        maxEntrypointSize: 1000000,
        maxAssetSize: 1000000,
    }
};
