//var sub = require('./sub');
//require('./main.css');
//require('./main.scss');
//var $ = require('jquery');
//var moment = require('moment'); //特别全面的时间插件
//moment.locale('zh-cn');
//var app = document.createElement('div');
//app.innerHTML = "<h1>Hello world</h1>";
//app.appendChild(sub);
//document.body.appendChild(app);
//$('body').append('<p> look at me ! now is '+moment().format('MMMM Do YYYY, h:mm:ss a')+'</p>');

import './main.css';
import './main.scss';
import generateText from './sub';
import $ from 'jquery';
import moment from 'moment';

let app = document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then((Number) => {
	$('body').append('<p> look at me ! now is '+moment().format('MMMM Do YYYY, h:mm:ss a')+'</p>');
});
app.innerHTML = '<h1>Hello world it</h1>';
document.body.appendChild(app);
app.appendChild(generateText());
