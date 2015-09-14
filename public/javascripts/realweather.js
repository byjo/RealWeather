(function() {
	document.addEventListener("DOMContentLoaded", function() {
		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(sucessToGetPos, errorToGetPos);
		else
			console.log("geolocation 사용 불가");

		$(".form .sky input").on("change", function() {
			$(".form .sky input").not(this).prop("checked", false);
			$(this).next().addClass("selected");
		})

		$(".temp_slider").on('change', function() {
			$(".temp_out").val(this.value);
		})

	});

	function sucessToGetPos(position) {
		var url = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=ko&latlng=%latitude%,%longitude%";
		url = url.replace("%latitude%", position.coords.latitude);
		url = url.replace("%longitude%", position.coords.longitude);

		$.get(url).done(function(response) {
			updateAddress(response);
		});

	}

	function updateAddress(response) {
		var location = document.querySelector(".location");

		// 대한민국 안나오게 그냥 하나씩 파싱할까
		location.innerHTML = response.results[2].formatted_address;
		
	}

	function errorToGetPos(msg) {
		console.log(msg);
	}


}());