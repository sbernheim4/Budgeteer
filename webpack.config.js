/* Used to extract the scss, compile it and write it to its own file */
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/* Used to minify the css after it has been written to its output file */
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const nano = require('cssnano');

/* Used to ensure proper order of CSS */
const StyleLintPlugin = require('stylelint-webpack-plugin');

const glob = require('glob');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	devtool: 'source-map', // Enables source maps for both JS(X) and (S)CSS
	entry: glob.sync('./src/components/**/*.jsx'),
	output: {
		// output build file to /public folder
		path: __dirname + '/public',
		filename: 'bundle.js'
	},
	module: {
		// use the babel-loader for all .jsx files
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			// use sass-loader, css-loader, and style-loader for all scss files
			// sass-loader converts scss to css
			// css-loader allows for using import or require statements in the css
			// style-loader injects the css into the browser in a style tag
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
			// UNCOMMENT THE FOLLOWING LINES TO PUT ALL THE SCSS INTO A SINGLE FILE
			// ,
			// {
			// 	test: /\.scss$/,
			// 	use: ExtractTextPlugin.extract({
			// 		fallback: 'style-loader',
			// 		use: ['css-loader', 'sass-loader']
			// 	})
			// }

		]
	},
	resolve: {
		extensions: ['*', '.js', 'jsx', '.scss']
	},
	plugins: [
		// UNCOMMENT THE FOLLOWING LINES TO PUT ALL THE SCSS INTO A SINGLE FILE
		// new ExtractTextPlugin({
		// 	filename: 'index.css'
		// }),

		// Optimizes css by minifying it and removing comments
		new OptimizeCssAssetsPlugin({
			cssProcessor: nano,
			cssProcessorOptions: {discardComments: {removeAll: true} },
			canPrint: true
		}),

		// CSS Linter based on rules set in the .stylelintrc file
		new StyleLintPlugin({
			configFile: './.stylelintrc',
			files: './src/scss/*.scss'
		})//,

		// // used for automatic reloading of the page on changes
		// new BrowserSyncPlugin({
		// 	notify: false,
		// 	host: 'localhost',
		// 	port: 3000,
		// 	server: { baseDir: ['public'] }
		// })
	]
};

