//这个应该是定义模块路径
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //直接从模块路径引入
//var webpack = require('webpack');		//这个得引用 为了解决jquery问题的的插件webpack.ProvidePlugin

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry: APP_PATH,
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},
	module: {
		perLoaders: [ //这个应该是loader加载之前执行,还有个loader执行之后值的PostLoaders
			{
				test: /\.jsx?$/,
				include: APP_PATH,
				loader: 'jshint-loader' //检查代码是否符合规范 据说npm run start 会有提示 不过我没看到
			}
		],
		loaders: [{
			test: /\.css$/,
			loaders: ['style', 'css'],
			include: APP_PATH
		}, {
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass'],
			include: APP_PATH
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=40000'
		}, {
			test: /\.jsx?$/,
			loader: 'babel',
			include: APP_PATH,
			query: {
				presets: ['es2015'] //这个是必须的,要不需要在根目录加个 .babelrc 文件 把这行写里
			}
		}, ]
	},
	//检查代码是否规范
	jshint: {
		"esnext": true
	},
	//添加我们的插件 会自动生成一个html文件
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Hello world app'
		}),
		//new webpack.HotModuleReplacementPlugin(), //这是hot的一个插件
		//webpack提供一个插件 把一个全局变量插入到所有的代码中
		//这个就是插入jquery到所有文件中,应对jquery老的插件不支持引用
		//		new webpack.ProvidePlugin({
		//			$: "jquery",
		//			jQuery: "jquery",
		//			"window.jQuery": "jquery"
		//		})	
	],
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		//这个好像是插件热插拔 还不太懂 . 好像是解析其他文件比如jxf 经过编译后输出 ,如果没有hot只有loader也不行.
		//前面好像理解的还是不对,这个是组件修改时浏览器同步.比如vuejs这种组件,修改会同步到浏览器. 以后测试确定下
		//修改好了 hot模式 报错问题.这个必须有webpace,我刚开始只装了webpace-dev-server
		hot: true,
		inline: true, //这个自动刷新
		progress: true,
		//其实很简单的，只要配置这个参数就可以了
		//重启以后 发现/api/*的请求都代理到http://localhost:5000去了～
		proxy: {
			'/api/*': {
				target: 'http://localhost:5000',
				secure: false
			}
		}
	}
}