//这个应该是定义模块路径
var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin'); //直接从模块路径引入
var webpack = require('webpack');		//这个得引用 为了解决jquery问题的的插件webpack.ProvidePlugin

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');
var TEM_PATH = path.resolve(APP_PATH,'templates');

module.exports = {
	//这是单页面(SPA)打包方式
//	entry: {
//		app: path.resolve(APP_PATH,'index.js'),
//		vendors: ['jquery','moment']
//	},
	entry: {
		//三个入口文件, app,mobile和vendors
		app: path.resolve(APP_PATH,'index.js'),
		mobile: path.resolve(APP_PATH,'mobile.js'),
		vendors: ['jquery','moment']
	},
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		//filename: 'bundle.js'
		//注意 我们修改了bundle.js 用一个数组[name]来代替，他会根据entry的入口文件名称生成多个js文件，这里就是(app.js,mobile.js和vendors.js)
		filename: '[name].[hash].js'
	},
	module:{    
		perLoaders: [	//这个应该是loader加载之前执行,还有个loader执行之后值的PostLoaders
        {
            test: /\.jsx?$/,
            include: APP_PATH,
            loader: 'jshint-loader'		//检查代码是否符合规范 据说npm run start 会有提示 不过我没看到
        }],
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
		},]
	},
	//添加我们的插件 会自动生成一个html文件
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Hello world app',
			template: path.resolve(TEM_PATH,'index.html'),
			filename: 'index.html',
			//chunks这个参数告诉插件要引用entry里面的哪几个入口
		    chunks: ['app', 'vendors'],
		    //要把script插入到标签里
		    inject: 'body'
		}),
		new HtmlWebpackPlugin({
			title: 'Hello Mobile app',
			template: path.resolve(TEM_PATH,'mobile.html'),
			filename: 'mobile.html',
			//chunks这个参数告诉插件要引用entry里面的哪几个入口
		    chunks: ['mobile', 'vendors'],
		    //要把script插入到标签里
		    inject: 'body'
		}),
		//这个使用uglifyJs压缩你的js代码
		new webpack.optimize.UglifyJsPlugin({minimize:true}),
		//把入口文件里面的数组打包成vendors.js		//如果是多文件这种设置的话就不需要这个了 如果是单文件的话就要这个打包成vendors.js
		//new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js'),
	],
	devtool: 'eval-source-map',
}
