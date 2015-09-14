var url = "ws://125.209.194.165:8080";
var connection = new WebSocket(url);

connection.onopen = function() {
	console.log("open");
	//connection.send("thank you for accepting this Web Socket request");
}

connection.onmessage = function(e) {
	var jsonData = JSON.parse(e.data);
	jsonData.temperature = parseInt(jsonData.temperature);
	jsonData.id = parseInt(jsonData.id);

	updateWeatherGraph(jsonData);
	updateWeatherBox(jsonData);
}

connection.onclose = function(e) {
	console.log("closed");
}

$(document).on("DOMContentLoaded", function() {
	$(".submit").on("click", function() {
		sendData();
		resetForm();
		// 오늘의 삽질 : input type="submit"이나 button element는 click시 page reload가 발생한다
		return false;
	})
})

function resetForm() {
	$(".form .selected").removeClass("selected").prev().prop("checked", false);
}

function sendData() {
	var sky = $(".form .sky .selected").attr("data-icon");
	var weather = {
		datetime : new Date().toISOString(),
		sky : sky,
		temperature : $(".form .temp_slider").val(),
		comment : $(".form .comments").val()
	}
	// websocket은 String, ArrayBuffer, Blob만 전송할 수 있다!
	connection.send(JSON.stringify(weather));
}

function updateWeatherBox(newWeather) {
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

