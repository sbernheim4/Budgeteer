module.exports = {
	devtool: "source-map", // Enables source maps for both JS(X) and (S)CSS
	entry: "./src/components/index.jsx",
	output: {
		// output build file to /public folder
        path: __dirname + "/public",
		filename: "bundle.js"
    },
    devServer: {
        contentBase: __dirname + "/public",
        port: 3000,
        proxy: {
            '/plaid-api': {
                target: 'http://localhost:5000',
                secure: false
            }
        }
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
		extensions: ["*", ".js", "jsx", ".scss"]
	},
	plugins: []
};

