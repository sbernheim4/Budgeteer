/* Used to minify the css after it has been written to its output file */
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const nano = require("cssnano");

/* Used to ensure proper order of CSS */
const StyleLintPlugin = require("stylelint-webpack-plugin");

/* Used to uglify bundle.js */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    // devtool: "source-map", // Enables source maps for both JS(X) and (S)CSS
    entry: "./src/components/index.jsx",
    output: {
        // output build file to /public folder
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        // use the babel-loader for all .jsx files
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"],
            },
            // use sass-loader, css-loader, and style-loader for all scss files
            // sass-loader converts scss to css
            // css-loader allows for using import or require statements in the css
            // style-loader injects the css into the browser in a style tag
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".js", "jsx", ".scss"]
    },
    plugins: [
        // Optimizes css by minifying it and removing comments
        new OptimizeCssAssetsPlugin({
            cssProcessor: nano,
            cssProcessorOptions: {discardComments: {removeAll: true} },
            canPrint: true
        }),

        // CSS Linter based on rules set in the .stylelintrc file
        new StyleLintPlugin({
            configFile: "./.stylelintrc",
            files: "./src/scss/*.scss"
        }),
        // Uglify JS
        new UglifyJsPlugin(),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};

