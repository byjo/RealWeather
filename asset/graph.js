(function() {

	var data = [
		{date: 1, temperature: 29}, 
		{date: 2, temperature: 31}, 
		{date: 3, temperature: 30}, 
		{date: 4, temperature: 28}, 
		{date: 5, temperature: 26}
	];

	var width = 500;
	var height = 800;
	var margin = {top: 30, right: 20, bottom: 30, left: 50};

	var xRange = d3.scale.linear().range([margin.left, width - margin.right]).domain([d3.min(data, function(d) {
	      return d.x;
	    }), d3.max(data, function(d) {
	      return d.x;
	    })]);
	var yRange = d3.scale.linear().range([height - margin.top, margin.bottom]).domain([d3.min(data, function(d) {
	      return d.y;
	    }), d3.max(data, function(d) {
	      return d.y;
	    })]);

	var x = d3.scale.linear().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
	var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

	var valueline = d3.svg.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.temperature); });

	var lineFunc = d3.svg.line()
		.x(function(d) {
			return xRange(d.x);
		})
		.y(function(d) {
			return yRange(d.y);
		})
		.interpolate("linear");

	var svg = d3.select("#d3Graph");

	svg.append("svg:g")
		.attr("class", "grid")
		.call(xAxis);

	svg.append("svg:g")
		.attr("class", "grid")
		.call(yAxis);

	svg.append("svg:path")
		.attr("class", "lines")
		.attr("d", lineFunc(data));

}());

