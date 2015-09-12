(function() {
	var data = [
		{datetime: "2015-09-12T11:32:02.075Z", temperature: 29, sky: "B"}, 
		{datetime: "2015-09-12T12:32:02.075Z", temperature: 31, sky: "C"}, 
		{datetime: "2015-09-12T13:32:02.075Z", temperature: 30, sky: "D"}, 
		{datetime: "2015-09-12T14:32:02.075Z", temperature: 28, sky: "E"}, 
		{datetime: "2015-09-12T15:32:02.075Z", temperature: 26, sky: "F"}
	];

	var width = 600;
	var height = 400;
	var margin = {top:50, right:80, bottom: 50, left: 50};

	var minTemp = d3.min(data, function(d) {
		return d.temperature;
	});
	var maxTemp = d3.max(data, function(d) {
		return d.temperature;
	});
	var mindate = new Date(data[0].datetime);
	var maxdate = new Date(data[data.length-1].datetime);

	// x, y축 범위 정하기
	var x = d3.time.scale().range([margin.left, width-margin.right]).domain([mindate, maxdate]);
	var y = d3.scale.linear().range([height-margin.top, margin.bottom]).domain([minTemp-1, maxTemp]);


	// x, y축 attribute 설정 
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		//.ticks(data.length)
		//.tickForamt(d3.time.format("%m/%d %H:%M"))
		.tickSubdivide(true);	

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(5)
		.tickSubdivide(true);


	var svg = d3.select(".weather_graph");


	// x축, y축 그리기 
	svg.append("svg:g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (height - margin.bottom) + ")")
		.call(xAxis);

	svg.append("svg:g")
		.attr("class", "axis")
		.attr("transform", "translate(" + (margin.left) + ",0)")
		.call(yAxis);


	// graph line 그릴 때 x, y좌표 찾는 function
	var lineFunc = d3.svg.line()
		.x(function(d) {
			return x(new Date(d.datetime));
		})
		.y(function(d) {
			return y(d.temperature);
		})
		.interpolate("interpolate");


	// graph line 그리기 
	svg.append("svg:path")
		.attr("d", lineFunc(data))
		.attr("class", "lines");

	var dotGroup = svg.append("svg:g");

	dotGroup.append("svg:g")
		.selectAll("dot")
		.data(data)
		.enter().append("circle")
		.attr("cx", function(d) {return x(new Date(d.datetime));})
		.attr("cy", function(d) {return y(d.temperature);})
		.attr("class", "rect")
		.text(function(d) {return d.sky;});

	// graph dot 그리기 
	dotGroup.append("svg:g")
		.attr("class", "points")
		.selectAll("dot")
		.data(data)
		.enter().append("text")
		.attr("x", function(d) {return x(new Date(d.datetime))-15;})
		.attr("y", function(d) {return y(d.temperature)+15;})
		.attr("class", "icon")
		.text(function(d) {return d.sky;});



}());

