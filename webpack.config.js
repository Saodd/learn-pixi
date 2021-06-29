const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.ts',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
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
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                include: path.resolve(__dirname, 'src'),
                type: "asset/resource",
            },
            {
                test: /\.(js|ts)$/,
                include: path.resolve(__dirname, 'src'),
                loader: "ts-loader",
                options: {}
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
