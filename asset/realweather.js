(function() {
	document.addEventListener("DOMContentLoaded", function() {
		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(sucess, error);
		else
			console.log("geolocation 사용 불가");
	});

	function sucess(position) {
		var location = document.querySelector(".location");

		location.innerHTML = '<p>위도 : ' + position.coords.latitude + '° <br>경도 : ' + position.coords.longitude + '°</p>'
	}

	function error(msg) {
		console.log(msg);
	}
}());