'use strict';
// 默认将鼠标移动至输入框中
// 天气简洁信息卡元素获取
var input = document.querySelector('input'),
	cityname = '';

var article = document.querySelector('.now-container');
var el = document.querySelector('#weather-handler');
// var URL = 'http://api.openweathermap.org/data/2.5/forecast';
var URL = 'http://api.openweathermap.org/data/2.5/weather';

var weather_icons_url = 'http://openweathermap.org/img/w/';
var APPID = '10b3d2f0dae67a22162adf2273b000d6';

// 缓存DOMsection.now元素数组
var sections = [],
    position = sections.length;

el.addEventListener('click', function() {
	
	// 全局范围内更新了input.value
	cityname = input.value;
	
	if(!cityname) {
		console.log('您想查询哪个城市呢?');
		return false;
	}

	$.getJSON( {
		url: URL,
		data: {
			q: input.value,
			APPID: APPID,
			lang: 'zh_cn'
		}
		// url: '../data/shenzhen_forcast.json',
		// url: '../data/shenzhen_current.json'
	})
	.done(getDataSuccess)
	.fail(function(){
		console.log( 'errors happeded!');
	})
	.always(console.log('get the XHR object'));

});


function getDataSuccess(data){
	console.log(cityname);

	var xhr = data,
		identity = '.now-' + cityname;
	

	// create a new weather card
	createWeatherCard(cityname);  //将对应的城市名以className传入

	//输入框和对应label
	var input = document.querySelector('#js-getWeather'),
		get_data = document.querySelector('label'),

		city_name = document.querySelector(identity +' .city-name'),
		weather_icon = document.querySelector(identity + ' .weather-icon'),
		weather_details_number = document.querySelector(identity + ' .now-number'),

		weather_humidity = document.querySelector(identity + ' .now-humidity span'),
		weather_wind_speed = document.querySelector(identity + ' .now-wind-speed span'),

		weather_time = document.querySelector(identity + ' .data-get-time'),
		weather_description = document.querySelector(identity + ' .data-description');

	// 数据填充
		city_name.innerText= xhr.name;
		weather_icon.setAttribute('src', weather_icons_url + xhr.weather[0].icon + '.png');
		weather_details_number.innerText = Math.round(xhr.main.temp - 273.5);
		weather_humidity.innerText = xhr.main.humidity;
		weather_wind_speed.innerText = xhr.wind.speed;
		weather_description.innerText = xhr.weather[0].description;
		weather_time.innerText = dateConventor(xhr.dt);



}

function dateConventor(UNIX_stamps) {
var date = new Date(UNIX_stamps * 1000),
	year, month, day, hour, minute, second, dates,times,time;

	year = date.getFullYear();
	month = date.getMonth() + 1;
	day = date.getDate();
	hour = '0' + date.getHours();
	minute = '0' + date.getMinutes();
	second = '0' + date.getSeconds();

	dates = [year, month, day],
	times = [hour, minute, second];

	for( var i = 0; i < times.length; i++ ) {
		times[i] = times[i].substr(-2);
	}

		return time = dates.join('-') + ' ' + times.join(':');
}

function createWeatherCard(name) {

	var city = name;

	var card = '<h3 class="city-name"></h3><div class="now-details"><div class="flex"><img class="icon weather-icon"><div class="temp_details"><span class="now-number">22</span><span>℃</span></div></div><div class="now-weather"><h3 class="now-humidity">湿度<span></span></h3><h3 class="now-wind-speed">风级<span></span></h3></div></div><div class="now-description"><span class="data-get-time">the time get the data</span><p class="data-description">data description about the weather now</p></div>';
	
	
	var button = '<button class=forcase-test-button>详情</button>';


	

	
	if(!position) {

		article.insertAdjacentHTML('afterbegin', '<section class="now " >' + card + button + '</section>');

		sections = document.querySelectorAll('section.now');
		sections[0].classList.add('now-' + city);

		position++;
	}else {
		sections[position - 1 ].insertAdjacentHTML('afterend', '<section class="now">' + card + button + '</section>');
		sections = document.querySelectorAll('section.now');
		sections[position].classList.add('now-' + city);
	}
	
	

}
// 定义动画
// D3.js引入

//重组数据为三元

var chart_data = [];

function dataReDesign(data) {

	var	chart_meta_data = {},
	    temp_data,
		index = data.list[0].dt_txt.lastIndexOf(' ');

	for(let i = 0; i < data.list.length; i++) {

		chart_meta_data.icon = data.list[i].weather[0].icon;
		chart_meta_data.dt = data.list[i].dt_txt.slice(index + 1);
		chart_meta_data.temp = data.list[i].main.temp;

		// temp_data = chart_meta_data;
		// chart_data.push(chart_meta_data);
		// chart_data[i] = JSON.parse(JSON.stringify(chart_meta_data));
		// chart_data.push(Object.assign({}, chart_meta_data ));
		var ture_null = Object.create( null );
		chart_data.push( ture_null, chart_meta_data);
	}
	return chart_data;
}

d3.json('../data/data.json', function(error, json) {
	if(error) return console.warn(error); 
	dataReDesign(json);
});



//mock data
var data = [{
	"sale": "202",
	"year": "2000"
}, {
	"sale": "215",
	"year": "2001"
}, {
	"sale": "179",
	"year": "2002"
}, {
	"sale": "199",
	"year": "2003"
}, {
	"sale": "134",
	"year": "2003"
}, {
	"sale": "176",
	"year": "2010"
}];
//获取chart位置,定义一些基础数据
var chart = d3.select('#chart'),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
	    top: 20,
	    right: 20,
	    bottom: 20,
	    left: 50
    },
    x_scale, y_scale, x_axis, y_axis;

/*
 d3.scale.linear(range, domain) 建立图表范围
 range定义图表的画布范围,domain定义轴的步进,Array
 定义x,y轴线
*/

x_scale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2000, 2010]);
y_scale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134, 215]);

// d3.svg.axis()画图开始

x_axis = d3.svg.axis()
  .scale(x_scale);

y_axis = d3.svg.axis()
  .scale(y_scale)
  .orient('left');

// append to svg conrainer

chart.append('svg:g')
  .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
  .attr('class', 'axix')
  .call(x_axis);

chart.append('svg:g')
  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
  .attr('class', 'axix')
  .call(y_axis);

//apply the data with axis and draw lines: d3.svg.line
//定义了话数据曲线的方法
var lineGenerator = d3.svg.line()
  .x(function(d) {
	  return x_scale(d.year);
  })
  .y(function(d) {
	  return y_scale(d.sale);
  })
  .interpolate('basis');

//append line path to svg and map the sample data to the plotting space using lineGen function
chart.append('svg:path')
  .attr('d', lineGenerator(data))
  .attr('stroke', 'red')
  .attr('stroke-width', 2)
  .attr('fill', 'none');





