var el = document.querySelector('#js-getWeather');
// var URL = "http://api.openweathermap.org/data/2.5/forecast?q=shenzhen&APPID=10b3d2f0dae67a22162adf2273b000d6";
// var URL = "http://api.openweathermap.org/data/2.5/weather?q=shenzhen&APPID=10b3d2f0dae67a22162adf2273b000d6";

var weather_icons_url = 'http://openweathermap.org/img/w/';


el.addEventListener('blur', function() {

	$.getJSON( {
		// url: URL
		// url: '../data/shenzhen_forcast.json',
		url: '../data/shenzhen_current.json'
	})
	.done(getDataSuccess)
	.fail(function(){
		console.log( "errors happeded! ");
	})
	.always(console.log('get the XHR object'));

});


function getDataSuccess(data){
	// 天气简洁信息卡元素获取
	var xhr = data;

	var input = document.querySelector('#js-getWeather'),
		get_data = document.querySelector('.now label'),

		city_name = document.querySelector('.city-name'),
		weather_icon = document.querySelector('.weather-icon'),
		weather_details_number = document.querySelector('.now-number'),

		weather_humidity = document.querySelector('.now-humidity span'),
		weather_wind_speed = document.querySelector('.now-wind-speed span'),

		weather_time = document.querySelector('.data-get-time'),
		weather_description = document.querySelector('.data-description');


		// console.log(xhr.weather);
	city_name.innerText = xhr.name;
	weather_icon.setAttribute('src', weather_icons_url + xhr.weather[0].icon + '.png');	
	weather_details_number.innerText = xhr.main.temp;
	weather_humidity.innerText = xhr.main.humidity;
	weather_wind_speed.innerText = xhr.wind.speed;
	weather_description.innerText = xhr.weather[0].description;
	weather_time.innerText = dateConventro(xhr.dt);

}

function dateConventro(UNIX_stamps) {
	var date = new Date(UNIX_stamps * 1000),
		year, month, day, hour, minute, second, time;

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

