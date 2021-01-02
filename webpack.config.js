const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

/* Used to generate html file from template */
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* Used to minify the css after it has been written to its output file */
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const nano = require('cssnano');

/* Used to ensure proper order of SCSS/CSS */
const StyleLintPlugin = require('stylelint-webpack-plugin');

const WebpackBar = require('webpackbar');

const dotenv = require('dotenv');
const env = dotenv.config().parsed || process.env;
const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	return prev;
}, {});

const clientConfig = {
	devtool: 'source-map',
	entry: {
		budgeteer: './src/budgeteer/index.jsx', // Entry point of where webpack should start from
		home: './src/home/index.jsx' // Entry point of where webpack should start from
	},
    target: "web",
	output: {
		// output build file to /public folder and call the file bundle.js
		path: __dirname + '/public',
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		rules: [
			// lint all jsx files and then run babel on them before bundling
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader']
			},

			{
				test: /\.tsx$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader', 'ts-loader']
			},

			// use sass-loader, css-loader, and style-loader for all scss files
			// sass-loader - converts scss to css
			// postcss-loader for backwards compatibility
			// css-loader - allows for using import or require statements in jsx files
			// style-loader - injects css into the browser via style tags
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
			},

			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			}
		]
	},

	mode: process.env.NODE_ENV || 'development',

	resolve: {
		extensions: ['*', '.js', 'jsx', '.css', '.scss', '.sass']
	},

	devServer: {
		https: {
			key: fs.readFileSync('./server/encryption/budgeteer-prod.com-key.pem'),
			cert: fs.readFileSync('./server/encryption/budgeteer-prod.com.pem')
		},
		contentBase: path.join(__dirname, './public'),
		proxy: {
			'^/plaid-api/*': {
				target: 'https://budgeteer-prod.com:5000',
				secure: false
			},
			'^/user-info/*': {
				target: 'https://budgeteer-prod.com:5000',
				secure: false
			},
			'^/login/**/*': {
				target: 'https://budgeteer-prod.com:5000',
				secure: false
			}
		},
		historyApiFallback: {
			index: 'home.html',
			budgeteer: 'budgeteer.html'
		}
	},

	plugins: [
		new HtmlWebpackPlugin({
			base: './public/',
			template: 'HTMLTemplate.js',
			inject: true,
			title: 'Budgeteer',
			chunks: ['budgeteer'],
			message: 'budgeteer',
			filename: 'budgeteer.html'
		}),

		new HtmlWebpackPlugin({
			base: './public/',
			template: 'HTMLTemplate.js',
			inject: true,
			title: 'Home',
			chunks: ['home'],
			message: 'home',
			filename: 'home.html'
		}),

		// Optimizes css by minifying it and removing comments
		new OptimizeCssAssetsPlugin({
			cssProcessor: nano,
			cssProcessorOptions: { discardComments: { removeAll: true } },
			canPrint: true
		}),

		// CSS Linter based on rules set in the .stylelintrc file
		new StyleLintPlugin({
			configFile: './.stylelintrc',
			files: './src/**/*.scss'
		}),

		new WebpackBar(),

		new webpack.DefinePlugin(envKeys)
    ],
	optimization: {
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `npm.${packageName.replace('@', '')}`;
					},
				},
			},
		},
	},
};

module.exports = clientConfig;
