var RWEATHER = {
	init : function() {
		$(document).on("DOMContentLoaded", function() {
			$(".form .sky input").on("change", function() {
				$(".form .sky input").not(this).prop("checked", false);
				$(this).next().addClass("selected");
			})

			$(".temp_slider").on('change', function() {
				$(".temp_out").val(this.value);
			})

			$(".submit").on("click", function() {
				RWEATHERsync.sendWeather();
				this.resetForm();
				return false;
			}.bind(this));

			this.getPosition();
			this.showDate();
		}.bind(this));
	},

	getPosition : function() {
		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(this.success, this.error);
		else
			console.log("geolocation 사용 불가");

		// callback이 안먹힘 
		// this.success = function(position) {
		// 	RWEATHERsync.getGeoAddress(position, function(response) {
		// 		$(".location").text(response.results[2].formatted_address);
		// 	});
		// };

		// this.error = function(msg) {
		// 	console.log(msg);
		// };

	},

	success : function(position) {
		RWEATHERsync.getGeoAddress(position, function(response) {
			$(".location").text(response.results[2].formatted_address);
			RWEATHERgraph.initData();
		});
	},

	error : function(msg) {
		console.log(msg);
	},

	showDate : function() {
		var date = new Date();
		$(".weather_box .time").text(date.toLocaleString());

		setTimeout(this.showDate, 1000);
	},

	resetForm : function() {
		$(".form .selected").removeClass("selected").prev().prop("checked", false);
	},

	updateWeatherBox : function(newWeather) {
		var datetime = new Date(newWeather.datetime);
		var offset = (Date.now() - datetime.getTime())/1000;
		var suffix;

		$(".weather_detail .sky").attr("data-icon", newWeather.sky);
		$(".weather_detail .temperature").html(newWeather.temperature + "℃");
		$(".weather_detail .datetime").html(datetime.toLocaleString());

		if (offset < 60) {
			suffix = "초 전";
		} else if (offset < 3600) {
			suffix = "분 전";
			offset /= 60;
		} else {
			suffix ="시간 전"
			offset /= 60;
		}
		$(".weather_detail .timeOffset").html(offset + suffix);
	}
}

RWEATHER.init();
