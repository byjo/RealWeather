var RWEATHERgraph = {
	init : function() {
		this.width = 600;
		this.height = 400;
		this.margin = {top:50, right:80, bottom: 50, left: 50};
		
		this.x = d3.time.scale().range([this.margin.left, this.width-this.margin.right]);
		this.y = d3.scale.linear().range([this.height-this.margin.top, this.margin.bottom]).domain([-10, 40]);

		this.data;

		this.svg = d3.select(".weather_graph");
		this.xAxis;
		this.yAxis;
		this.lineFunc = d3.svg.line()
			.x(function(d) { return this.x(this.dateFn(d)); }.bind(this))
			.y(function(d) { return this.y(this.tempFn(d)); }.bind(this))
			.interpolate("interpolate");

		this.dateFn = function(d) {
			return new Date(d.datetime);
		}

		this.tempFn = function(d) {
			return d.temperature;
		}

		this.initData();
	},

	initData : function() {
		RWEATHERsync.getWeatherData(this.updateWeatherGraph.bind(this));
	},

	updateWeatherGraph : function(newWeather) {
		if (!this.data)
			this.data = newWeather;
		else
			this.data.push(newWeather);
		this.drawGraph();
	},

	drawGraph : function() {
		// x축(시간)의 범위 연장 
		this.x.domain(d3.extent(this.data, this.dateFn));

		this.svg.selectAll("g.xaxis").remove();

		// x축 재설정
		this.xAxis = d3.svg.axis()
			.scale(this.x)
			.orient("bottom")
			//.ticks(data.length)
			//.tickForamt(d3.time.format("%m/%d %H:%M"))
			.tickSubdivide(true);

		// x축 다시그리기 
		this.svg.append("svg:g")
			//.attr("class", "axis")
			.attr("class", "xaxis")
			.attr("transform", "translate(0," + (this.height - this.margin.bottom) + ")")
			.call(this.xAxis);

		// 맨 처음 로드시 y축 설정 및 그리기 
		if(!this.yAxis) {
			this.yAxis = d3.svg.axis()
				.scale(this.y)
				.orient("left")
				.ticks(5)
				.tickSubdivide(true);

			this.svg.append("svg:g")
				//.attr("class", "axis")
				.attr("class", "yaxis")
				.attr("transform", "translate(" + (this.margin.left) + ",0)")
				.call(this.yAxis);
		}

		var circles = this.svg.selectAll("circle").data(this.data);
		var texts = this.svg.selectAll(".icon").data(this.data);

		// 기존에 그려진 item 이동 
		circles.transition()
			.attr("cx", function(d) { return this.x(this.dateFn(d)); }.bind(this))
			.attr("cy", function(d) { return this.y(this.tempFn(d)); }.bind(this));

		texts.transition()
			.attr("x", function(d) { return this.x(this.dateFn(d))-15; }.bind(this))
			.attr("y", function(d) { return this.y(this.tempFn(d))+15; }.bind(this));


		//group을 어떻게 할지 
		// 새로 들어온 데이터 그리기 
		circles.enter()
			.append("circle")
			.attr("cx", function(d) { return this.x(this.dateFn(d)); }.bind(this))
			.attr("cy", function(d) { return this.y(this.tempFn(d)); }.bind(this))
			.attr("class", "around")
			.text(function(d) {return d.sky;});

		texts.enter()
			.append("text")
			.attr("x", function(d) { return this.x(this.dateFn(d))-15; }.bind(this))
			.attr("y", function(d) { return this.y(this.tempFn(d))+15; }.bind(this))
			.attr("class", "icon")
			.text(function(d) { return d.sky; });

		this.svg.selectAll("path.lines").remove();

		// line 그리기 
		this.svg.append("svg:path")
			// 얘가 왜 this bind안해도 되는지 잘 모르겠네 
			.attr("d", this.lineFunc(this.data))
			.attr("class", "lines");

		// 임시방편 
		d3.select(".around").attr("visibility", "hidden");
		d3.select("text.icon").attr("visibility", "hidden");

	}

}

RWEATHERgraph.init();
