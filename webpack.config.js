//这个应该是定义模块路径
var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin'); //直接从模块路径引入

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');

module.exports = {
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry: APP_PATH,
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},
	module:{
		loaders: [{
			test: /\.css$/,
			loaders: ['style','css'],
			include: APP_PATH
		},{
			test: /\.scss$/,
			loaders: ['style','css','sass'],
			include: APP_PATH
		},{
			test: /\.(png|jpg)$/,
			loader: 'url?limit=40000'
		},{
			test: /\.jsx?$/,
			loader: 'babel',
			include: APP_PATH,
			query: {
				presets: ['es2015']	//这个是必须的,要不需要在根目录加个 .babelrc 文件 把这行写里
			}
		}]
	},
	//添加我们的插件 会自动生成一个html文件
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Hello world app'
		}),
		//new webpack.HotModuleReplacementPlugin()
	],
	devServer:{
		historyApiFallback: true,
		//hot: true,		//这个好像是插件热插拔 还不太懂 不过默认还得插件才可以,要不报错. 好像是解析其他文件比如jxf 经过编译后输出 ,如果没有hot只有loader也不行
		inline: true,	//这个自动刷新
		progress: true,
	}
}
