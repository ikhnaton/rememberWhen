const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const pluginConfigs = {
	ExtractTextPlugin: new ExtractTextPlugin("main.css"),
	CopyWebpackPlugin: new CopyWebpackPlugin([
			{ from: 'src/index.html', to: 'index.html' },
			{ from: 'src/images', to: 'images' },
			{ from: 'node_modules/semantic-ui-css/themes', to: 'themes' },
			{ from: 'node_modules/semantic-ui-css/semantic.css', to: '.' }
		], {}),
	UglifyJsPlugin:	new UglifyJsPlugin()
};

const baseConfig = {
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/dist')
	},
	stats: "errors-only",
	module: {
		loaders: [
			{
				enforce: "pre",
				test: [/\.js$/, /\.jsx$/],
				exclude: [/node_modules/,/lib/,/vcap.local.js/],
				loader: "eslint-loader",
				options: {
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
	}
};

const clientConfig = Object.assign({}, baseConfig, {
	entry: {
		bundle: path.join(__dirname, '/src/app.jsx')
	},
	target: 'web',
	plugins: [
		pluginConfigs.ExtractTextPlugin,
		pluginConfigs.CopyWebpackPlugin,
		pluginConfigs.UglifyJsPlugin
	]
})

const serverConfig = Object.assign({}, baseConfig, {
	entry: {
		backend: path.join(__dirname, '/server/server.js')
	},
	target: 'node',
	plugins: [
		pluginConfigs.ExtractTextPlugin,
		pluginConfigs.UglifyJsPlugin
	]
//	externals: ['express']
})

module.exports = [ clientConfig, serverConfig ]
module.exports.pluginConfigs = pluginConfigs;
