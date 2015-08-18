

(function() {

	var data = [
		{date: 1, temperature: 29}, 
		{date: 2, temperature: 31}, 
		{date: 3, temperature: 30}, 
		{date: 4, temperature: 28}, 
		{date: 5, temperature: 26}
	];

	var width = 800;
	var height = 500;
	var margin = {top:50, right:100, bottom: 50, left: 100};

	var minTemp = d3.min(data, function(d) {
		return d.temperature;
	});
	var maxTemp = d3.max(data, function(d) {
		return d.temperature;
	});

	var x = d3.scale.linear().range([margin.left, width-margin.right]).domain([1, 5]);
	var y = d3.scale.linear().range([height-margin.top, margin.bottom]).domain([minTemp, maxTemp]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.ticks(5)
		.tickSubdivide(true);	

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(5)
		.tickSubdivide(true);

	var svg = d3.select("#d3Graph");

	svg.append("svg:g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (height - margin.bottom) + ")")
		.call(xAxis);

	svg.append("svg:g")
		.attr("class", "axis")
		.attr("transform", "translate(" + (margin.left) + ",0)")
		.call(yAxis);


	var lineFunc = d3.svg.line()
		.x(function(d) {
			return x(d.date);
		})
		.y(function(d) {
			return y(d.temperature);
		})
		.interpolate("linear");

	svg.append("svg:path")
		.attr("d", lineFunc(data))
		.attr("class", "lines");


}());

