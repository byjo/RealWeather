var RWEATHERsync = {
	init : function() {
		//var url = "ws://125.209.194.165:8080";
		var url = "ws://localhost:8080";
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
			jsonData.id = parseInt(jsonData.id);

			RWEATHERgraph.updateWeatherGraph(jsonData);
			RWEATHER.updateWeatherBox(jsonData);
		}
	},

	sendWeather : function() {
		var sky = $(".form .sky .selected").attr("data-icon");
		var weather = {
			datetime : new Date().toISOString(),
			sky : sky,
			temperature : $(".form .temp_slider").val(),
			comment : $(".form .comments").val()
		}
		this.connection.send(JSON.stringify(weather));
	},

	// 얘를 이쪽으로 빼는게 모듈화에 맞는 것인가?
	getGeoAddress : function(position, callback) {
		var url = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=ko&latlng=%latitude%,%longitude%";
		url = url.replace("%latitude%", position.coords.latitude);
		url = url.replace("%longitude%", position.coords.longitude);

		$.get(url).done(function(response) {
			callback(response);
		});
	},

	getWeatherData : function(callback) {
		//var url = "http://125.209.194.165:3000/weather";
		var url = "http://localhost:3000/weather";
		$.get(url).done(function(response) {
			callback(response);
		})
	}
}

RWEATHERsync.init();