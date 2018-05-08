/* Used to minify the css after it has been written to its output file */
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const nano = require("cssnano");

/* Used to uglify bundle.js */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpack = require('webpack');

const WebpackBar = require('webpackbar');

module.exports = {
	//devtool: "eval-source-map",  Enables source maps for both JS(X) and (S)CSS
	entry: {
		budgeteer: "./src/budgeteer/index.jsx", // Entry point of where webpack should start from
		home: "./src/home/index.jsx"
	},
	output: {
		// output build file to /public folder and call the file bundle.js
		path: __dirname + "/public",
		filename: "[name].js"
	},
	module: {
		// use the babel-loader for all .jsx files
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			// use sass-loader, css-loader, and style-loader for all scss files
			//    sass-loader - converts scss to css
			// postcss-loader - runs postcss using postcss.config.js to handle external tools like autoprefixer
			//     css-loader - allows for using import or require statements in the css
			//   style-loader - injects the css into the browser in a style tag
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
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

		// Uglify JS
		new UglifyJsPlugin(),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),

		new WebpackBar()
	]
};

