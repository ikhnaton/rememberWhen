const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		bundle: path.join(__dirname, '/src/app.jsx'),
		backend: path.join(__dirname, '/server/server.js'),
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/dist')
	},
	externals: ['express'],
	stats: {
		colors: true
	},
	devtool: 'source-map',
	node: {
	  fs: 'empty',
	  tls: 'empty',
	  module: 'empty',
	  node: 'empty',
	  net: 'empty'
	},
	module: {
		loaders: [
			{
				enforce: "pre",
				test: [/\.js$/, /\.jsx$/],
				exclude: [/node_modules/,/lib/,/vcap.local.js/],
				loader: "eslint-loader",
				options: {
//					config: path.resolve(__dirname, '.eslintrc.js'),
				}
			},
			{
				test: [/\.js$/, /\.jsx$/],
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: [/\.css$/,/\.less$/],
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader","less-loader"]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("main.css"),
		new CopyWebpackPlugin([
			{ from: 'src/index.html', to: 'index.html' },
			{ from: 'src/images', to: 'images' },
			{ from: 'node_modules/semantic-ui-css/themes', to: 'themes' },
			{ from: 'node_modules/semantic-ui-css/semantic.css', to: '.' }
		], {})
	],
	watch: true

};
