/**
 * View that renders a Plot2D
 * 
 */
var Plot2DView = Backbone.View.extend({

	//initial values here are static (shared between instances)
	
	
		tagName: "div",
		template: null,
				
		
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			this.template = _.template($('#chart-template').html());
			this.listenTo(this.model, 'change', this.render);

	    	Global.eventBus.on("view:selection", this.select, this);
		},
		
		//Render app
	    render: function() {
		      
	    	//render container template
	    	this.$el.html(this.template(this.model.toJSON()));     	
	    	
	    	//get the reference to the SVG inside the template
	    	this.svgReference = d3.select(this.el).select("svg");
	    	
	    	//get model attributes
	    	var w = this.model.get("width");
	    	var h = this.model.get("height");
	    	var colors = this.model.get("colors");
	    	var xAxisCol = this.model.get("xAxisCol");
	    	var yAxisCols = this.model.get("yAxisCol");
	    	var prefix = this.model.get("prefix") || "";
	    	var suffix = this.model.get("suffix") || "";
	    	var yUnit = this.model.get("yUnit");
	    	
	    	var numberFormat = this.model.get("numberFormat") || "";
	    	
	    	var margin = {top: 20, right: 20,
	    				bottom: this.model.get("marginBottom"),
	    				left: this.model.get("marginLeft")};
	    	
	    	//set size
	    	d3.select(this.el)
	    		.attr("class", "chart-container")
    			.style("width", (w + 10) + "px");
	    		
	    	
	    	this.svgReference
	    		.attr("width", w)
	    		.attr("height", h);		
	    	
	    	
	    	var chartArea = this.svgReference
						.append("g")
			    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	    	
	    	//the chart area's widht/height are reduced due to the margins
	    	areaW = w - margin.left - margin.right;
	    	areaH = h - margin.top - margin.bottom;
	    	
	    	var x0 = d3.scale.ordinal()
	        			.rangeRoundBands([0, areaW], 0.1, 0.7); //0.1 space, 0.7 padding on the sides

	    	var x1 = d3.scale.ordinal();
	      
	    	var y = d3.scale.linear()
	    	
	          		.rangeRound([areaH, 5],0.1, 0.7);
	    	
	    	
	    	//construct X axis path calculator
	    	var xAxis = d3.svg.axis()
				        .scale(x0)
				        .orient("bottom");
	    	
	    	//construct Y axis path calculator
	    	var yAxis = d3.svg.axis()
				        .scale(y)
				        .orient("left")
				        .ticks([6]) //5 ticks per axis
				        .tickFormat(d3.format(numberFormat)); //d3.format(".1%");
	    	
	    	
	    	//if there is no data, go away
	    	if (!this.model.has("data")) return this;
	    	
	    	
	    	//FILL UP DATA ARRAY -----------------------------
	    	// TODO move this to the model
	    	
	    	var categories = new Array();
	    	// format: [ [ x, y1, y2... ], ... ]
	    	var dataArray = new Array();
	    		    	
	    	var data = this.model.get("data");
	    	
	    	
	    	var min = this.model.get("min") != null ? this.model.get("min") : 0; //Number.MAX_VALUE;
	    	var max = this.model.get("max") != null ? this.model.get("max") : Number.MIN_VALUE;
	    	
	    	var maxSum = 0;
	    	
	    	data.forEach(function (row) {
	    		
	    		var skip = false;
	    		
	    		if (this.model.has("filters"))
	    		{
	    			var filters = this.model.get("filters");
	    			
	    			skip = !DataUtils.isIncluded(row, filters);
	    		}
	    		
	    		
	    		if (!skip)
	    		{
		    		categories.push(row[xAxisCol]);
		    		
		    		var rowVector = new Array(); //[x, y1, y2...]
		    		rowVector.push(row[xAxisCol]); // push x
		    		
		    		var sum = 0;
		    		//for each metric
		    		for (var yi = 0; yi < yAxisCols.length; yi++)
		    		{
			    		//convert to number
			    		var n = +row[yAxisCols[yi]];
			    		
			    		if (n > max) max = n;
			    		if (n < min) min = n;
			    		
			    		//push yi
			    		rowVector.push(n);
			    		//compute stack height
			    		sum += n;
		    		}
		    		if (sum > maxSum) maxSum = sum;
		    		
		    		dataArray.push(rowVector);
	    		}
	    		
	    	}, this);
	    	
	    	//tell the axis which are the possible values
	    	//categories
	    	x0.domain(categories); 
	    	
	    	//metrics (each metric fits inside the slot of one category)
	    	x1.domain(yAxisCols).rangeRoundBands([ 0, x0.rangeBand() ]);
	    	
	    	
	    	
	    	if (this.model.get("type") == "stacked")
	    		y.domain([min, maxSum]).nice(); //numeric range for stacks
	    		
	    	else	    		
	    		y.domain([min, max]).nice(); //general numeric range
	    	
	    	var xRotation = this.model.get("xRotation");
	    	var xVisibility = this.model.get("xVisibility");
	    	//draw X axis at the bottom
	    	if (!this.model.get("hideXAxis"))
	    	{
	    		chartArea.append("g")
					        .attr("class", "x axis")
					        .attr("transform", "translate(0," + areaH + ")")
					        .call(xAxis)
					        	.selectAll("text")
					        	.attr("visibility","" + xVisibility )
					            .style("text-anchor", "end")
					            .attr("dx", "-.8em")
					            .attr("dy", ".6em")
					            .attr("transform", function(d) {
					                return "rotate(" + xRotation + ")";
					                });
					                
	    	}
	    	//draw Y axis and unit label
			if (!this.model.get("hideYAxis"))
			{
				chartArea.append("g")
					        .attr("class", "y axis")
					        .call(yAxis)
					      .append("text")
					        .attr("transform", "rotate(-90)")
					        .attr("y", 15) //posição do rótulo do eixo y
					        .attr("x", 0)
					        .style("text-anchor", "end")
					        .text(yUnit || "Unidade");
			}
			
			
	    		    	
	    	//draw the bars (IF type == "column")
	    	if (this.model.get("type") == "column")
	    	{
	    		
		    		
		    		
	    		var groups = chartArea.selectAll(".group2D")
	    			.data(dataArray)
	    		  .enter().append("g") //new composition
	    		  	.attr("transform", function(d) {
	    		  	//group position is at the corresponding category position
					    return "translate(" + x0(d[0]) + ",0)"; //axis assigns position based on the value
					    
					});
	    		
	    		
	    		
			    groups.selectAll(".bar2D")
			    	.data(function (groupRow) { return _.rest(groupRow); }) //[ y1, y2 ...] (drop x)
			        .enter().append("rect") //append a rect for each yi
			        .attr("fill", function(d, i) { return colors[i]; })
			        .attr("x", function(d, i) { return x1(yAxisCols[i]); }) //position assigned based on metric name			        
			        .attr("y", function(d) { return y(d); }) //axis assigns position based on the value
			        .attr("height", function(d) { return areaH - y(d); })
			        .attr("title", function(d, i) { return "<b>" + yAxisCols[i] + "</b><br/>"+ yUnit + ": " + prefix + " " + d3.format(numberFormat)(d) + "" + suffix; })
			        
			        
			        .transition()	
					.duration("400")
					.attrTween("width", function tween(d, i, a) {
						  return d3.interpolate(a, x1.rangeBand());
					})
			        ;
	    		
	    	}
		    	else
	    	if (this.model.get("type") == "stacked")
	    	{	    		
	    		
	    	  var bar = chartArea.selectAll(".bar2D")
	    	      .data(dataArray)
	    	    .enter().append("g")
	    	      .attr("transform", function(d) { return "translate(" + x0(d[0]) + ",0)"; });
	    	  	
	    	  bar.selectAll("rect")
	    	      .data(function(row) {
	    	    	  		var stack = new Array();
	    	    	  		
	    	    	  		var nextTop = min;
	    	    	  		var ys = _.rest(row);
	    	    	  		ys.forEach(function(d) {
	    	    	  			stack.push({ top: nextTop + d - min, height: d - min, x: row[0] });
	    	    	  			nextTop += d - min;
	    	    	  		});
	    	    	  		
	    	    	  		return stack;
	    	    	  })
	    	    	  
	    	    .enter().append("rect")
	    	      .attr("height", function(d) { return areaH - y(d.height); })
	    	      .attr("y", function(d) { return y(d.top); })
	    	      .style("fill", function(d, i) { return colors[i]; })
	    	      .attr("title", function(d, i) { 
										return "<b>" + yAxisCols[i] + "</b><br/>" 
										+ xAxisCol + ": " + d.x + "<br/>"
										+ yUnit + ": " + d3.format(numberFormat)(d.height)+ "" + suffix; 
								})
				.transition()	
					.duration("400")
					.attrTween("width", function tween(d, i, a) {
						  return d3.interpolate(a, x0.rangeBand());
					})
					;
	    	}
	    	else
	    	if (this.model.get("type") == "line")
	    	{
	    		//draw a line for each metric d[1]..d[N]
	    		for (var j = 0; j < yAxisCols.length; j++)
	    		{	    		
		    		var line = d3.svg.line()
		    	    	.x(function(d) { return x0(d[0]); })
		    	    	.y(function(d) { return y(d[j+1]); })
		    	    	.interpolate('linear');
		    			    		
		    		var g = chartArea.append("g")
		    			.attr("class", "line2D");
		    		
		    		g.append("svg:path")
				        .attr("stroke", colors[j])
				        .attr("stroke-width", 2)
				        .attr("fill", "none")
				        .attr("d", line(dataArray));
		    		
		    		g.selectAll(".dot")
			    	    .data(dataArray)
			    	    .enter().append("circle")
			    	    .attr("class", "line2Dpoint")
			    	    .attr("stroke", colors[j])
			    	    .attr("fill", "white")
			    	    .attr("title", function(d) { 
					    					return "<b>" + yAxisCols[j] + "</b><br/>" 
											+ xAxisCol + ": " + d[0] + "<br/>"
											+ yUnit + ": " + d3.format(numberFormat)(d[j+1]); 
									})
			    	    .attr("cx", line.x())
			    	    .attr("cy", line.y())
			    	    .attr("r", 3.5);
	    		}
	    	}
	    	else
	    	if (this.model.get("type") == "scatter")
	    	{
	    		
	    		
	    		//draw a line for each metric d[1]..d[N]
	    		for (var j = 0; j < yAxisCols.length; j++)
	    		{
	    			var pointLinear = null;
			    	
			    	if (this.model.get("valueAsPointSize") == true)
			    		//pointLinear = DataUtils.createColumnLinear(data, yAxisCols[j], this.model.get("filters"), [5,10]);
			    		pointLinear = d3.scale.linear()
											.domain([min, max]).nice()
											.range([3,10]);
	    			
	    			var line = d3.svg.line()
		    	    	.x(function(d) { return x0(d[0]); })
		    	    	.y(function(d) { return y(d[j+1]); })
		    	    	.interpolate('linear');
		    			    		
		    		var g = chartArea.append("g")
		    			.attr("class", "dots2D");
		    		
		    		g.selectAll(".dot")
			    	    .data(dataArray)
			    	  .enter().append("circle")
			    	    .attr("class", "scatter2Dpoint")
			    	    .attr("stroke", colors[j])
			    	    .attr("fill", colors[j])
			    	    .attr("title", function(d) { 
			    	    					return "<b>" + yAxisCols[j] + "</b><br/>" 
			    	    							+ xAxisCol + ": " + d[0] + "<br/>"
			    	    							+ yUnit + ": " + d3.format(numberFormat)(d[j+1]); 
			    	    					})
			    	    .attr("cx", line.x())
			    	    .attr("cy", line.y())
			    	    .attr("r", function(d) {
							    	    	return pointLinear ? pointLinear(d[j+1]) : 5; 
							    	    });
	    		}
	    	}
	    	else
	    	if (this.model.get("type") == "column+line")
	    	{
	    		var groups = chartArea.selectAll(".group2D")
	    			.data(dataArray)
	    		  .enter().append("g") //new composition
	    		  	.attr("transform", function(d) {
	    		  	//group position is at the corresponding category position
					    return "translate(" + x0(d[0]) + ",0)"; //axis assigns position based on the value
					});
	    		
			    groups.selectAll(".bar2D")
			    	.data(function (groupRow) { return _.rest(groupRow); }) //[ y1, y2 ...] (drop x)
			      .enter().append("rect") //append a rect for each yi
			        .attr("fill", function(d, i) { return colors[i]; })
			        .attr("x", function(d, i) { return x1(yAxisCols[i]); }) //position assigned based on metric name			        
			        .attr("y", function(d) { return y(d); }) //axis assigns position based on the value
			        .attr("height", function(d) { return areaH - y(d); })
			        .attr("title", function(d, i) { return "<b>" + yAxisCols[i] + "</b><br/>" + yUnit + ": " + d3.format(numberFormat)(d)+ "" + suffix; })
			      .transition()	
					.duration("400")
					.attrTween("width", function tween(d, i, a) {
						  return d3.interpolate(a, x1.rangeBand());
					})
			        ;
			    
			  //draw a line for each metric d[1]..d[N]
	    		for (var j = 0; j < yAxisCols.length; j++)
	    		{	    		
		    		var line = d3.svg.line()
		    	    	.x(function(d) { return x0(d[0]) + x1(yAxisCols[j]) + x1.rangeBand()/2; })
		    	    	.y(function(d) { return y(d[j+1]); })
		    	    	.interpolate('linear');
		    			    		
		    		var g = chartArea.append("g")
		    			.attr("class", "line2D");
		    		
		    		g.append("svg:path")
				        .attr("stroke", d3.rgb(colors[j]).darker(1).toString())
				        .attr("stroke-width", 2)
				        .attr("stroke-dasharray", "5,5")
				        .attr("fill", "none")
				        .attr("d", line(dataArray));
		    		
		    		g.selectAll(".dot")
			    	    .data(dataArray)
			    	  .enter().append("circle")
			    	    .attr("class", "line2Dpoint")
			    	    .attr("stroke", d3.rgb(colors[j]).darker(1).toString())
			    	    .attr("fill", "white")
			    	    .attr("title", function(d) { 
					    					return "<b>" + yAxisCols[j] + "</b><br/>" 
											+ xAxisCol + ": " + d[0] + "<br/>"
											+ yUnit + ": " + d3.format(numberFormat)(d[j+1])+ "" + suffix; 
									})
			    	    .attr("cx", line.x())
			    	    .attr("cy", line.y())
			    	    .attr("r", 3.5);
	    		}
			    
	    	}
	    	
	    	//RENDER LEGEND ----------------------
	    	var numOfClasses = yAxisCols.length;
	    	var cols = this.model.get("legendNumCols") || Math.ceil(Math.sqrt(numOfClasses));
	    	var rows = Math.ceil(numOfClasses/cols);
	    	
	    	var legend = new Legend({ labels: yAxisCols, colors: colors, numCols: cols, numRows: rows });
	    	var legendView = new LegendView({model: legend});
	    	
	    	this.$('.chart-legend').html(legendView.render().el);
	    	
		      return this;
	    },
	    
	    
	    select: function(selection) {
	    		    	
	    	if (selection)
	    	{
		    	//if no selection Col provided, select on the X axis
		    	var selectionCol = this.model.get("selectionAxisCol") || this.model.get("xAxisCol");
		    	var selectionVal = selection;
		    	
		    	var filters = this.model.get("filters");		    	
		    	filters.selected = [ { column: selectionCol, value: selectionVal }];
		    	
		    	this.model.set({"filters": filters}); //setting the same object will not trigger change
		    	this.model.trigger("change");  //trigger change event
	    	}
	    	else
	    	{
	    		var filters = this.model.get("filters");
	    		filters.selected = null;
	    		this.model.set({"filters": filters});
	    		this.model.trigger("change");  //trigger change event
	    	}
	    	
	    }
  });