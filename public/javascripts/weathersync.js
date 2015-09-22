var RWEATHERsync = {
	weather : {},
	init : function() {
		var url = "ws://125.209.194.165:8080";
		//var url = "ws://localhost:8080";
		this.connection = new WebSocket(url);

		this.connection.onopen = function() {
			console.log("open");
		}

		this.connection.onclose = function(e) {
			console.log("closed");
		}

		this.connection.onmessage = function(e) {
			var jsonData = JSON.parse(e.data);
			jsonData.temperature = parseInt(jsonData.temperature);

			RWEATHERgraph.updateWeatherGraph(jsonData);
			RWEATHER.updateWeatherBox(jsonData);
		}
	},

	loadImageData : function(e) {
		var file = e.target.files[0];
		var reader = new FileReader();

		this.photo = file;
	},

	sendWeather : function() {
		var sky = $(".form .sky .selected").attr("data-icon");

		this.weather.datetime = new Date().toISOString();
		this.weather.sky = sky;
		this.weather.temperature = $(".form .temp_slider").val();
		this.weather.comment = $(".form .comments").val();
		this.weather.photo = {};
		this.weather.photo.url = Date.now() + "." + this.photo.type.split("/")[1];

		this.photo.rename = this.weather.photo.url;

		var formData = new FormData();
		formData.append("fileName", this.weather.photo.url);
		formData.append("photo", this.photo);

		var xhr = new XMLHttpRequest;
		xhr.open('POST', 'http://localhost:3000/weather', true);
		xhr.send(formData);

		this.connection.send(JSON.stringify(this.weather));
	},

	// 얘를 이쪽으로 빼는게 모듈화에 맞는 것인가?
	getGeoAddress : function(position, callback) {
		var url = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=ko&latlng=%latitude%,%longitude%";
		url = url.replace("%latitude%", position.coords.latitude);
		url = url.replace("%longitude%", position.coords.longitude);
		this.weather.latitude = position.coords.latitude;
		this.weather.longitude = position.coords.longitude;

		$.get(url).done(function(response) {
			this.weather.city = response.results[2].address_components[2].short_name;
			this.weather.country = response.results[2].address_components[1].short_name;
			this.weather.village = response.results[2].address_components[0].short_name;

			callback(response);
		}.bind(this));
	},

	getWeatherData : function(callback) {
		var url = "http://125.209.194.165:3000/weather";
		//var url = "http://localhost:3000/weather";
		$.get(url, this.weather).done(function(response) {
			// mongodb에서 온 data는 json 이구나?
			response.reverse();
			callback(response);
			RWEATHER.updateWeatherBox(response.pop());
		});
	}
}

RWEATHERsync.init();