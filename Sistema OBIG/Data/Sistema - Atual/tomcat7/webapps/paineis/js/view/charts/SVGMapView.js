/**
 * View that renders an SVGMap
 * 
 */
var SVGMapView = Backbone.View.extend({

	//initial values here are static (shared between instances)
	
		tagName: "div",
		template: null,
				
		zoomedIn: false,
		
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			this.template = _.template($('#chart-template').html());
			
			var self = this;
			
			this.zoomedIn = false;
			
			//Load the SVG file and re-render when loaded
			d3.xml(this.model.get("file"), "image/svg+xml", function(error, xml) {
				  self.model.set({"mapEl": xml.documentElement });
				  //self.render();
				});
			
			this.listenTo(this.model, 'change', this.render);			

	    	Global.eventBus.on("view:selection", this.select, this);
		},
		
		//Render app
	    render: function() {
		      
	    	//render container template
	    	this.$el.html(this.template(this.model.toJSON()));     	
	    	
	    	var w = this.model.get("width");
	    	var h = this.model.get("height");
	    	
	    	
	    	
	    	d3.select(this.el)
	    		.attr("class", "chart-container")
				.style("width", (w + 10) + "px");
	    	
	    	this.$el.append('<img id="loading-gif" src="img/loading-small-blue.gif"/>');
	    		    	
	    	if (!this.model.has("mapEl"))
	    	{
	    		//loading image
	    		return this;
	    	}
	    	
	    	//get the reference to the SVG inside the template
	    	this.svgReference = d3.select(this.el).select("svg");
	    	
	    	this.svgReference
	    		.attr("width", w)
	    		.attr("height", h)
	    		.attr("preserveAspectRation", "xMidYMid slice")
	    		//.attr("viewBox", "0 0 500 350")
	    		.attr("class", "YlGn");
	    	
	    	//copy drawing from the SVG file to the SVG DOM
	    	_.each(this.model.get("mapEl").childNodes, function(e)
	    	{
	    		if (e != null)
	    		{	    		
		    		if (e.nodeName == "g")
		    			this.svgReference.append(function() { return e.cloneNode(true); });
	    		}
	    		
	    	}, this);
	    	//remove loading bar
	    	this.$("#loading-gif").remove();
	    	
	    	var data = this.model.get("data");
	    		    	
	    	if (data)
	    	{	
	    		var xAxisCol = this.model.get("xAxisCol");
	    		var yAxisCol = this.model.get("yAxisCol");
				var totalAxisCol = this.model.get("totalAxisCol");
				
				var decimals = this.model.get("decimals");
				if (decimals == null) decimals = 0;
				
				var isPercentage = (totalAxisCol != null);
				var prefix = this.model.get("prefix") || "";
				var suffix = this.model.get("suffix") || "";
				var numberFormat = this.model.get("numberFormat");
				
				if (numberFormat == null)
				{
					if (isPercentage) numberFormat = "," + decimals + "%";
					else numberFormat = "." + decimals + "f";
				}
				
				
				
				
		    	var selectionValue = "0";
		    	
		    			    		    			    	
		    	var min = Number.MAX_VALUE;
		    	var max = Number.MIN_VALUE;
		    	
		    	data.forEach(function (row) {
		    		
		    		var locationName = row[xAxisCol];
		    		
		    		var skip = false;
		    		
		    		if (this.model.has("filters"))
		    		{
		    			var filters = this.model.get("filters");
		    			
		    			skip = !DataUtils.isIncluded(row, filters);
		    		}
		    		
		    		
		    		if (!skip)
		    		{
			    		//convert to number
			    		var n = +row[yAxisCol];
						var y = n; //reference Y value (when using percentage)
						var t = null; //total for 100%
						
						if (isPercentage)
						{
							t = +row[totalAxisCol];
							
							if (t > 0) n = n / t;
							else n = 0;
						}
			    		
			    		if (n > max) max = n;
			    		if (n < min) min = n;
			    			    		
			    		
				    	var isSelected = locationName == this.model.get("selected");
				    	
				    	if (isSelected)
				    		selectionValue = d3.format(numberFormat)(n);
			    						    	
				    	this.svgReference.select("path[label='" + locationName.replace("'", "\\'").replace("\"", "\\\"") + "']")
							.datum({ yAxisCol: yAxisCol, viewRef: this, value: n, y: y, total: t, selected: isSelected })
							.attr("title", function (d) { return "<b>" + locationName
									+ "</b><br/>" + yAxisCol 
									+ ": " +prefix+ " " + d3.format(numberFormat)(d.value)
									+ (isPercentage ? " (" + d3.format('.0f')(d.y) + ")<br/>" + totalAxisCol + " (total): " + d3.format('.0f')(d.total) : "")
									 + suffix+ "<br/>";});
				    	
		    		}
		    	}, this);
	    	
		    	
		    	//check COLORIZE method
		    	if (this.model.get("colorize") == "fixed")
		    	{
		    		// COLORIZE - fixed based on { intervals: [ [>=X, <Y] ..], colors: [], labels: []}
		    		var colorizeModel = this.model.get("colorizeModel");
		    		
		    		var intervals = colorizeModel.intervals;
		    		var colors = colorizeModel.colors;
		    		var labels = colorizeModel.labels;
		    		
		    		this.svgReference.selectAll("path")
						.style("fill", function(d) 
		                   {	
								if (!d) return "#EEE";
								
								if (d.selected) return d.viewRef.model.get("selectionColor");
								
		  	  					for (var i = 0; i < intervals.length; i++)
		  	  					{
		  	  						if (d.value >= intervals[i][0]
		  	  							&& d.value < intervals[i][1])
		  	  							return colors[i];
		  	  					}
		                     	
		                     	return "#EEE";
		                    } );
		    		
		    		//render legend
		    		var cols = this.model.get("legendColumns") || Math.floor(Math.sqrt(labels.length));
			    	var rows = Math.ceil(labels.length/cols);
			    	
		    		var legend = new Legend({ labels: labels, colors: colors, numCols: cols, numRows: rows });
			    	var legendView = new LegendView({model: legend});
			    	
			    	this.$('.chart-legend').html(legendView.render().el);
		    	}
		    	else
		    	{
			    	// COLORIZE - automatic based on min/max/steps
			    	
		    		var colorQuantizer = DataUtils.createColorQuantizer(min, max, 
						this.model.get("minColor"),
						this.model.get("maxColor"),
						this.model.get("colorSteps"));
		    		
		    		
		    		this.svgReference.selectAll("path")
		    					.style("fill", function(d) 
		    	                   {	
		    							if (!d) return "#EEE";
		    							
		    							if (d.selected) return d.viewRef.model.get("selectionColor");
		    							
		    	  	  					var q = colorQuantizer(d.value);	  	  				
		    	  	  				
		    	                     	return d3.rgb(q).toString();
		    	                    } )
		    	                /*.classed("inactive", function(d) {
		    	                	return d.viewRef.model.get("selected") != null && !d.selected;
		    	                })*/;
		    		
		    		
		    		//--- render Legend ------
			    	
		    		var labels = new Array();
		    		var colors = new Array();
		    		var numOfClasses = this.model.get("colorSteps");
		    		
					//to render the legend of PERCENTAGE maps, we multiply the intervals by 100
		    		var multiplier = 1;
					if (isPercentage) multiplier = 100;
					
					
		    		var left = min * multiplier;
			    	var interval = ((max - min)*multiplier)/numOfClasses;
			    	var n = 1;
			    	if (decimals > 0) n = n / Math.pow(10, decimals);
			    	
			    	for (var i=0; i < numOfClasses; i++)
			    	{
			    		var right = left+interval - n;
			    		if (i == numOfClasses - 1) right += n; //the last tick is included
			    		
						var percentSign = "";
						if (isPercentage) percentSign = "%";
						
			    		labels.push(DataUtils.prettyNumber(left, decimals) + " - " + DataUtils.prettyNumber(right, decimals) + percentSign);
			    		var c = colorQuantizer(right/multiplier);
			    		colors.push(d3.rgb(c).toString());
			    		
			    		left = right + n;
			    	}
		    		
			    	var cols = Math.floor(Math.sqrt(numOfClasses));
			    	var rows = Math.ceil(numOfClasses/cols);
			    	
			    	var legend = new Legend({ labels: labels, colors: colors, numCols: cols, numRows: rows });
			    	var legendView = new LegendView({model: legend});
			    	
			    	this.$('.chart-legend').html(legendView.render().el);
		    	}
		    	
		    	//render selection info
		    	var selectedLocation = this.model.get("selected");
		    	if (selectedLocation)
		    	{
		    		/*var path = this.svgReference.select("path[label='" + selectedLocation.replace("'", "\\'").replace("\"", "\\\"") + "'");		    		
		    		var pathBBox = path[0][0].getBBox();
		    		console.log(pathBBox);*/
		    		
			    	var selBox = new SelectionBox({
			    					svgReference: this.svgReference,
			    					positioning: this.model.get("selectionBoxPosition") || "bottom-right",
			    					title: this.model.get("selected"),
			    					values: [ { name: yAxisCol, value: selectionValue }]/*,
			    					fromPoint: { x: pathBBox.x, y: pathBBox.y }*/
			    					});
			    	var selBoxView = new SelectionBoxView({model: selBox});
			    	
			    	selBoxView.render();
			    	
			    	// circle over the area
			    	var path = this.svgReference.select("path[label='" + selectedLocation.replace("'", "\\'").replace("\"", "\\\"") + "']");		    		
		    		var pathBBox = path[0][0].getBBox();
		    		var center = [ pathBBox.x + pathBBox.width/2, pathBBox.y + pathBBox.height/2 ];
		    		
		    		var view = this;
		    		
		    		this.svgReference.select("#panelist-map-areas")
		    			.append("circle")
		    			.attr("cx", center[0])
		    			.attr("cy", center[1])
		    			.attr("opacity", ".8")
		    			.attr("r", 120)
		    			.attr("fill-opacity", "0.3")
		    			.attr("fill", "#5924C9")
		    			.attr("stroke", "white")
		    			.attr("stroke-width", 3)
		    			.style("cursor", "pointer")
		    			.on("click", function() {
		    				//path - d3 selection
		    				//path.data() - array of attached data
		    				//path[0][0] - node corresponding to the selection
		    				view.pathClicked(path.data()[0], path[0][0]);
		    			})
		    		  .transition()
		    		  	.attr("r", 10)
		    		  	.duration("1600")
		    		  	.ease("elastic");
		    	}
		    	else
		    	{
		    		//display total
		    	}
		    	
		    	//register events
		    	this.svgReference.selectAll("path")
		    		.on("click", this.pathClicked);
		    	this.svgReference.selectAll("text")
					.on("click", this.pathClicked);
	    	}
	    	
			
			//this.svgReference.selectAll("text")
			//	.on("click", this.pathClicked);
	    	
	    	
	    	
			
		      return this;
	    },
	    
	    //this - refers to the path
	    //d - refers to the data associated with the path object
	    pathClicked: function (d)
	    {
	    	var label;
	    	//check if a label was clicked instead of a path
	    	if ($(this).prop("tagName") == "text")
	    	{
	    		//if so, get the path with id or label equal to the label
	    		var id = $(this).text();
	    		
	    		 var path = d3.select("#"  + id);
	    		 	    		 
	    		 if (path)
	    		 {
	    			 label = path.attr("label");
	    		 }
	    		 else
	    		 {
	    			 path = d3.select("path[label='"+id+"']");
	    			 label = id;
	    		 }
	    		
	    		 d = path.datum();
	    	}
	    	else
	    		label = $(this).attr("label");
	    	
	    	if (label == d.viewRef.model.get("selected"))
	    		//already selected, unselect
	    		d.viewRef.model.set({"selected": null });
	    	else
	    		d.viewRef.model.set({"selected": label });
	    	
	    	//tell the navigator that the area has been selected
	    	//Global.eventBus.trigger("view:selection", d.viewRef.model.get("selected"));
	    	Global.navigator.navigate(null, d.viewRef.model.get("selected"));	    		    	
	    	
	    },
	    
	    
	    select: function(selection) {
	    	this.model.set({"selected": selection});
	    }
	    
  });