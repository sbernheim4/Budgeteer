/* Used to ensure proper order of CSS */
const StyleLintPlugin = require("stylelint-webpack-plugin");

/*
 * Used to cache modules from node_modules so that they are only rebuilt when
 * something in node_modules changes and not just on any change
 */
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const WebpackBar = require('webpackbar');

module.exports = {
	devtool: "source-map", // Enables source maps for both JS(X) and (S)CSS
	entry: {
		budgeteer: "./src/budgeteer/index.jsx", // Entry point of where webpack should start from
		home: "./src/home/index.jsx"
	},
	output: {
		// output build file to /public folder and call the file bundle.js
		path: __dirname + "/public",
		filename: "[name].js"
	},

	// Dev server configuration
	devServer: {
		contentBase: __dirname + "/public", // where static files should be served from - ex: imgs
		port: 3000, // Port that webpack dev server should use
		// Set up a proxy for my api --> All calls to /plaid-api are redirected to use a different port where the epxress server is running
		proxy: {
			'/plaid-api': {
				target: 'http://localhost:5001', // URL of the express server
				secure: false // using https or no
			},
			'/budgeteer': {
				target: 'http://localhost:5001', // URL of the express server
				secure: false // using https or no
			}
		}
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
				use: ["style-loader", "css-loader", "sass-loader"]
			}
		]
	},
	resolve: {
		extensions: ["*", ".js", "jsx", ".scss"] // allows me to leave off the extension when importing - import File from '../path/to/file'
	},
	plugins: [
		// CSS Linter based on rules set in the .stylelintrc file
		new StyleLintPlugin({
			configFile: "./.stylelintrc",
			files: "./src/scss/*.scss"
		}),

		new WebpackBar(),

		new BrowserSyncPlugin({
			// browse to http://localhost:3000/ during development,
			// ./public directory is being served
			host: 'localhost',
			port: 3000,
			proxy: 'http://localhost:5001/'
    	}),

		new HardSourceWebpackPlugin()
	]
};

