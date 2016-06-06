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

	// 数据组装
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
// //get the container
var chartData = [4, 8, 12, 23, 44, 100];
// var chart = d3.select(".chart");
// //initiate the data by defining the selection to which we will join the data
// var bar = chart.selectAll("div");
// //data join
// var barUpdate = bar.data(chartData);
// //append the div
// var barEnter = barUpdate.enter().append("div");
// //set the width of each new bar as associated data value:d
// barEnter.style("width", function(d){return d * 10 + "px"});
// //set text content and lable
// barEnter.text(function(d) {return d;});

//chainning
var x = d3.scale.linear()
  .domain([0, d3.max(chartData)])
  .range([0, 420]);

d3.select('.chart')
  .selectAll('div')
  .data(chartData)
  .enter().append('div')
  .style('width', function(d){ return x(d) + 'px'})
  .text(function(d) {return d; });
// 考虑要不要重组数据结构


