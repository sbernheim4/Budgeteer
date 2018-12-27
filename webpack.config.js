const path = require('path');

const glob = require('glob');

/* Used to generate html file from template */
// const HtmlWebpackPlugin = require('html-webpack-plugin')

/* Used to minify the css after it has been written to its output file */
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const nano = require("cssnano");

/* Used to ensure proper order of SCSS/CSS */
const StyleLintPlugin = require("stylelint-webpack-plugin");

const WebpackBar = require('webpackbar');

module.exports = {
	devtool: 'source-map',
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
		rules: [
			// lint all jsx files and then run babel on them before bundling
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: ["babel-loader", "eslint-loader"],
			},

			// use sass-loader, css-loader, and style-loader for all scss files
			// sass-loader - converts scss to css
			// css-loader - allows for using import or require statements in the jsx
			// style-loader - injects the css into the browser in a style tag
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			},

			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader"
				]
			}
		]
	},

	mode: process.env.NODE_ENV || 'development',

	resolve: {
		extensions: ['*', '.js', 'jsx', '.css', '.scss', '.sass']
	},

	devServer: {
		historyApiFallback: true,
		contentBase: path.join(__dirname, './public'),
		proxy: {
			"/api": "http://localhost:3000"
		}
	},

	plugins: [
		// new HtmlWebpackPlugin({
		// 	base: './public/',
		// 	template: 'HTMLTemplate.js',
		// 	dest: 'index.html',
		// 	inject: false,
		// 	title: 'Premiere Mern Stack'
		// }),

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

		new WebpackBar()
	]
}
