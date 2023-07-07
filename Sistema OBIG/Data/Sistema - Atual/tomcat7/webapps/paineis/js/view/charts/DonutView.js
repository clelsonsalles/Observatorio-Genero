/**
 * View that renders a PercentageArc
 * 
 */
var DonutView = Backbone.View.extend({

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
	    	
	    	var valueObj = this.model.compute();
	    	var value = valueObj.percentage;
	    	var absolute = valueObj.absolute;
	    	
	    	
	    	//set size
	    	d3.select(this.el)
	    		.attr("class", "chart-container")
    			.style("width", (w + 10) + "px");
	    		
	    	
	    	this.svgReference
	    		.attr("width", w)
	    		.attr("height", h);		
	    	
	    	var width = w,
	        height = h,
	        radius = Math.min(width, height) / 2;
	    	
	    	var color = d3.scale.ordinal()
	        .range(['#522900','#8F4700','#CC6600','#DB944D','#EBC299']);
	    	
	    	var svg = d3.select("body").append("svg")
	        .attr("width", width)
	        .attr("height", height)
	      .append("g")
	        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	    	
	    	var g = svg.selectAll(".arc")
	        .data(pie(data))
	      .enter().append("g")
	        .attr("class", "arc");

	    g.append("path")
	        .attr("d", arc)
	        .style("fill", function(d) { return color(d.data.age); });

	    g.append("text")
	        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	        .attr("dy", ".35em")
	        .text(function(d) { return d.data.age; });
	    	
	    var g = svg.selectAll(".arc")
	      .data(pie(data))
	    .enter().append("g")
	      .attr("class", "arc");

	  g.append("path")
	      .attr("d", arc)
	      .style("fill", function(d) { return color(d.data.age); });

	  g.append("text")
	      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	      .attr("dy", ".35em")
	      .text(function(d) { return d.data.age; });
	    }
		      

		function type(d) {
		  d.population = +d.population;
		  return d;
		}
		
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