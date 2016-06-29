'use strict';
// 默认将鼠标移动至输入框中
// 天气简洁信息卡元素获取
var input = document.querySelector('input')
  , cityname = '';
var article = document.querySelector('.now-container');
var el = document.querySelector('#weather-handler');
var URL_FORECAST = 'http://api.openweathermap.org/data/2.5/forecast';
var URL_CURRENT = 'http://api.openweathermap.org/data/2.5/weather';
var weather_icons_url = 'http://openweathermap.org/img/w/';
var APPID = '10b3d2f0dae67a22162adf2273b000d6';
// 缓存DOMsection.now元素数组
var sections = []
  , position = sections.length;
el.addEventListener('click', function() {
    // 全局范围内更新了input.value
    cityname = input.value;
    if (!cityname) {
        console.log('您想查询哪个城市呢?');
        return false;
    }

    fetch(URL_CURRENT + '?q=' + input.value + '&APPID=' + APPID)
        .then(function(response) {
            return response.json();
        })
        .then(getDataSuccess)
        .catch(function(error) {
            console.log('Fetch Error: -S', error);
        });

});

function getDataSuccess(data) {
    var xhr = data,
        identity = '.now-' + cityname;
    // create a new weather card
    createWeatherCard(cityname);
    //将对应的城市名以className传入
    //输入框和对应label
    var input = document.querySelector('#js-getWeather')
      , get_data = document.querySelector('label')
      , city_name = document.querySelector(identity + ' .city-name')
      , weather_icon = document.querySelector(identity + ' .weather-icon')
      , weather_details_number = document.querySelector(identity + ' .now-number')
      , weather_humidity = document.querySelector(identity + ' .now-humidity span')
      , weather_wind_speed = document.querySelector(identity + ' .now-wind-speed span')
      , weather_time = document.querySelector(identity + ' .data-get-time')
      , weather_description = document.querySelector(identity + ' .data-description');
    // 数据填充
    city_name.innerText = xhr.name;
    weather_icon.setAttribute('src', weather_icons_url + xhr.weather[0].icon + '.png');
    weather_details_number.innerText = Math.round(xhr.main.temp - 273.5);
    weather_humidity.innerText = xhr.main.humidity;
    weather_wind_speed.innerText = xhr.wind.speed;
    weather_description.innerText = xhr.weather[0].description;
    weather_time.innerText = dateConventor(xhr.dt);
}
function dateConventor(UNIX_stamps) {
    var date = new Date(UNIX_stamps * 1000), year, month, day, hour, minute, second, dates, times, time;
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hour = '0' + date.getHours();
    minute = '0' + date.getMinutes();
    second = '0' + date.getSeconds();
    dates = [year, month, day];
    times = [hour, minute, second];
    for (var i = 0; i < times.length; i++) {
        times[i] = times[i].substr(-2);
    }
    // return time = dates.join('-') + ' ' + times.join(':');
    return hour;
}
function createWeatherCard(name) {
    var city = name;
    var card = '<h3 class="city-name"></h3><div class="now-details"><div class="flex"><img class="icon weather-icon"><div class="temp_details"><span class="now-number">22</span><span>℃</span></div></div><div class="now-weather"><h3 class="now-humidity">湿度<span></span></h3><h3 class="now-wind-speed">风级<span></span></h3></div></div><div class="now-description"><span class="data-get-time">the time get the data</span><p class="data-description">data description about the weather now</p></div>';
    var button = '<button class=forcase-test-button>详情</button>';
    if (!position) {
        article.insertAdjacentHTML('afterbegin', '<section class="now " >' + card + button + '</section>');
        sections = document.querySelectorAll('section.now');
        sections[0].classList.add('now-' + city);
        position++;
    } else {
        sections[position - 1].insertAdjacentHTML('afterend', '<section class="now">' + card + button + '</section>');
        sections = document.querySelectorAll('section.now');
        sections[position].classList.add('now-' + city);
    }
}
//重组数据为三元
var chart_data_list = [];
//定义一个用来传入纯粹数据的空对象
function dataReDesign(data) {
    var chart_meta_data = {}
      , chart_meta_data_min = {}
      , chart_meta_data_max = {}
      , index = data.list[0].dt_txt.lastIndexOf(' ');
    for (let i = 0; i < data.list.length; i++) {
        //temp
        chart_meta_data.icon = data.list[i].weather[0].icon;
        //easy way converts string to number
        chart_meta_data.dt = data.list[i].dt_txt.substr(index + 1, 2);
        //K to C
        chart_meta_data.temp = 1 * (data.list[i].main.temp - 273.15).toFixed(2, 10);
        var temp_clone_data = Object.assign({}, chart_meta_data);
        //定义到全局,chart_data会推入所有查询的数据,每次查询前需清空
        chart_data_list.push(temp_clone_data);
    }
}
var button = document.getElementById('chart-forcast');
button.addEventListener('click', chartInit, false);

function chartInit(data){
	//格式化时间戳,获取时间
	var date_array_time = [],
	  splice_index, //定义数据分割参数
	  date_array_temperature = [],
	  oneDate = {
		  time: [],
		  temperature: []
	  };

	//新定义一个横坐标数据
	function xAxisData(data){
		//查询时间
		var now_date = new Date()
		  , now_date_hour = now_date.getHours();

		//推入所有获取的时间
		for(let i = 0; i < data.list.length; i++){
			date_array_time.push(data.list[i].dt);
		}

		for(let i = 0; i < data.list.length; i++){
			date_array_temperature.push(data.list[i].main.temp);
		}

		//返回小时数数组
		date_array_time.forEach(function(element, index){
			var hour;
			var date = new Date(element * 1000)
			  , hour = date.getHours();
			date_array_time[index] = hour;

			return date_array_time;
		});

		//展现当前时间后的24小时数据:匹配json数据中时间与当前时间匹配的时间点,截取之后的24小时的数据
		oneDate.time = date_array_time.splice(now_date_hour, 8);
		oneDate.temperature = date_array_temperature.splice(now_date_hour, 8);

		//新定义温度数据

	}

	//调用函数，初始化横坐标
	xAxisData(data);

	$('#chart-container').highcharts({
		title : {
			text : 'Weather in 5 days'
		},
		subtitle : {
			text : 'Source: OpenWeather',
			x : -20
		},
		xAxis : {
			// categories: date_array_time
			categories : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},
		yAxis : {
			//定义纵坐标值,当用ceiling定义时,根据后续数据来自动拓展步进
			//floor: lowest number
			//ceiling: highest number
			title : {
				text : 'Temperature  (℃)'
			},
			// plotLines: [{
			//    value: 0,
			//    width: 2,
			//    color: '#f00'
			// }],
			floor : 0,
			ceiling : 40
		},
		legend : {
			layout : 'vertical',
			align : 'right',
			verticalAlign : 'middle',
			borderWidth : 1
		},
		series : [{
			//温度数据
			name : input.value || 'Shenzhen',
			// data: date_array_temperature
			date : [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
		}, {
			//温度数据
			name : input.value || 'Yiyang',
			// data: date_array_temperature
			date : [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
		}
		]

	});
}

//新定义一个跟当前时间展现24小时的天气预测数据
function weatherData(data) {}

document.getElementById('data-test').addEventListener('click', function() {
	$.getJSON({
	    // url: URL_FORECAST,
	    url: './data/data.json'
	    // data: {
		 //    q: input.value,
		 //    APPID: APPID,
		 //    lang: 'zh-cn'
		 //
	    // }
    }).done(chartInit)
      .fail(function() {
        console.warn('WTF!!!');
    });

}, false)
    
