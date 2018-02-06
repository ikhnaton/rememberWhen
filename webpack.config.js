const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

//const extractLess = new ExtractTextPlugin({
//    filename: "[name].[contenthash].css",
////    disable: process.env.NODE_ENV === "development"
//});

module.exports = {
	entry: path.join(__dirname, '/src/app.jsx'),
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/dist')
	},
	stats: {
		colors: true
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.jsx$/,
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
	],
	watch: true

};
