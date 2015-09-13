var data = [
	{id: 1, datetime: "2015-09-13T03:32:02.075Z", temperature: 29, sky: "B"}, 
	{id: 2, datetime: "2015-09-13T04:32:02.075Z", temperature: 31, sky: "C"}, 
	{id: 3, datetime: "2015-09-13T05:32:02.075Z", temperature: 30, sky: "D"}, 
	{id: 4, datetime: "2015-09-13T06:32:02.075Z", temperature: 28, sky: "E"}, 
	{id: 5, datetime: "2015-09-13T07:32:02.075Z", temperature: 26, sky: "F"}
];

var width = 600;
var height = 400;
var margin = {top:50, right:80, bottom: 50, left: 50};

var dateFn = function(d) {
	return new Date(d.datetime);
}

var tempFn = function(d) {
	return d.temperature;
}
// x, y축 범위 정하기
var x = d3.time.scale().range([margin.left, width-margin.right]).domain(d3.extent(data, dateFn));
var y = d3.scale.linear().range([height-margin.top, margin.bottom]).domain([-10, 40]);


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
	.attr("class", "icon_circle")
	.selectAll("circle")
	.data(data)
	.enter().append("circle")
	.attr("cx", function(d) {return x(new Date(d.datetime));})
	.attr("cy", function(d) {return y(d.temperature);})
	.attr("class", "around")
	.text(function(d) {return d.sky;});

dotGroup.append("svg:g")
	.attr("class", "points")
	.selectAll(".icon")
	.data(data)
	.enter().append("text")
	.attr("x", function(d) {return x(new Date(d.datetime))-15;})
	.attr("y", function(d) {return y(d.temperature)+15;})
	.attr("class", "icon")
	.text(function(d) {return d.sky;});

function updateWeather(newWeather) {
	data.push(newWeather);
	refreshGraph();
}

function refreshGraph() {
	x.domain(d3.extent(data, dateFn));
	y.domain(d3.extent(data, tempFn));

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		//.ticks(data.length)
		//.tickForamt(d3.time.format("%m/%d %H:%M"))
		.tickSubdivide(true);

	svg.append("svg:g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (height - margin.bottom) + ")")
		.call(xAxis);

	svg.append("svg:path")
		.attr("d", lineFunc(data))
		.attr("class", "lines");

	dotGroup.append("svg:g")
		.attr("class", "icon_circle")
		.selectAll("circle")
		.data(data)
		.enter().append("circle")
		.attr("cx", function(d) {return x(new Date(d.datetime));})
		.attr("cy", function(d) {return y(d.temperature);})
		.attr("class", "around")
		.text(function(d) {return d.sky;});

	dotGroup.append("svg:g")
		.attr("class", "points")
		.selectAll(".icon")
		.data(data)
		.enter().append("text")
		.attr("x", function(d) {return x(new Date(d.datetime))-15;})
		.attr("y", function(d) {return y(d.temperature)+15;})
		.attr("class", "icon")
		.text(function(d) {return d.sky;});
}
