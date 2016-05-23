var el = document.querySelector('#js-getWeather');


el.addEventListener('blur', function() {

	$.ajax( {
		url: './data/data.json',
		type: 'get',
		success: function(data) {
			console.log( data.city );
		},
		error: function(data) {
			console.log('ERROR');
		}
	});
});