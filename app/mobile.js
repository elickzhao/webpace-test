import './main.css';
import './main.scss';
import generateText from './sub';
import $ from 'jquery';
import moment from 'moment';
//注意这种写法 我们把jQuery这个变量直接插入到plugin.js里面了
//相当于在这个文件的开始添加了 var jQuery = require('jquery');
//这个是第二种方法 这个也挺好只针对需要的插件 如果老插件少的话用这种
//多的话用第一种更方便
import 'imports?jQuery=jquery!./plugin.js';

let app = document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then((Number) => {
	$('body').append('<p> look at me ! now is '+moment().format('MMMM Do YYYY, h:mm:ss a')+'</p>');
	$('p').greenify();
});
app.innerHTML = '<h1>Hello world it</h1>';
document.body.appendChild(app);
app.appendChild(generateText());
