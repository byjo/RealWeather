var url = "ws://localhost:8080";
var connection = new WebSocket(url);

connection.onopen = function() {
	console.log("open");
	//connection.send("thank you for accepting this Web Socket request");
}

connection.onmessage = function(e) {
	var jsonData = JSON.parse(e.data);
	jsonData.temperature = parseInt(jsonData.temper래ature);
	jsonData.id = parseInt(jsonData.id);
	updateWeather(jsonData);
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
		id : 6,
		datetime : new Date().toISOString(),
		sky : sky,
		temperature : $(".form .temp_slider").val(),
		comment : $(".form .comments").val()
	}
	// websocket은 String, ArrayBuffer, Blob만 전송할 수 있다!
	connection.send(JSON.stringify(weather));
}

