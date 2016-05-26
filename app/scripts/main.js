var el = document.querySelector('#js-getWeather');
// var URL = "http://api.openweathermap.org/data/2.5/forecast?q=shenzhen&APPID=10b3d2f0dae67a22162adf2273b000d6";


el.addEventListener('blur', function() {

	$.ajax( {
		// url: URL,
		url: '../data/shenzhen_cn.json',
		type: 'get',
		data: {
			units: "metric",
			lang: "zh_cn"
		},
		success: function(data) {
			console.log( data.city );
		},
		error: function(data) {
			console.log('ERROR');
		}
	});

});
