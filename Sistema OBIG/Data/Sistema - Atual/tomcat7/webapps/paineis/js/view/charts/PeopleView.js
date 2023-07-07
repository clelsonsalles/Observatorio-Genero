/**
 * View that renders a People
 * 
 */
var PeopleView = Backbone.View.extend({

		//initial values here are static (shared between instances)
	
		tagName: "div",
		template: null,
				
		svgReference: null,
				
		iconNode: null,
		
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			this.template = _.template($('#chart-template').html());
			this.listenTo(this.model, 'change', this.render);
			
			Global.eventBus.on("view:selection", this.select, this);
			
			var self = this;
			//Load the SVG file and re-render when loaded
			d3.xml(this.model.get("icon"), "image/svg+xml", function(error, xml) {
				  //get the root SVG									
				  self.iconNode = xml.documentElement;
				  self.render();
				});
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
	    	var color1 = this.model.get("color1");
	    	var color2 = this.model.get("color2");
	    	
	    	var noData = false;
	    	
	    	var value = this.model.compute();
	    	
	    	if (value == null) //no data
	    	{
	    		value = 0.0;
	    		color2 = "silver"; //neutral color
	    		noData = true;
	    	}
	    	
	    	//set size
	    	d3.select(this.el)
	    		.attr("class", "chart-container")
    			.style("width", (w + 10) + "px");
	    		
	    	
	    	this.svgReference
	    		.attr("width", w)
	    		.attr("height", h);		
	    	
	    	
	    	//render the icons
	    	if (this.iconNode != null)
	    	{
	    		_.each(this.iconNode.childNodes, function(e)
	    		    	{
	    		    		if (e != null)
	    		    		{	    		
	    			    		if (e.nodeName == "g")
	    			    		{
	    			    			var lines = this.model.get("lines");
	    			    			var columns = this.model.get("columns");
	    			    			
	    			    			var division = 1;
	    			    				    			    			
	    			    			var valueRounded = Math.round(value*lines*columns); 
	    			    			var totalModels = lines*columns;
	    			    			
	    			    			for (var i=0; i < columns; i++)
	    			    				for (var j=0; j < lines; j++)
	    			    				{	
	    			    					var color = division <= valueRounded ?
	    			    									color1 : color2;
	    			    					
	    			    					var type =  division <= valueRounded ?
	    			    									"<b>" + this.model.get("yAxisCol1") + ":</b> " + valueRounded + " / " + totalModels
	    			    									: 
	    			    									"<b>" + this.model.get("yAxisCol2")  + ":</b> " + (totalModels - valueRounded) + " / " + totalModels;
	    			    					
											var y = noData ? "--" : d3.format(".0%")(value);
																			
											var scale = this.model.get("scale");
											var sw = this.model.get("symbolWidth");
											var sh = this.model.get("symbolHeight");
											
			    			    			this.svgReference
			    			    				.append(function() { return e.cloneNode(true); })
			    			    				.attr("fill", color)
			    			    				.attr("title", type)
			    			    				.attr("transform", "scale("+scale+")translate(" + (10 + (i*sw)) + "," + (15 + (j*sh)) + ")");
			    			    			
			    			    			division++;
	    			    				}
	    			    		}
	    		    		}
	    		    		
	    		    	}, this);
		    			    	
	    	}
	    	
	    	this.svgReference
	    		.append("g")
	    		.append("text")
				.attr("text-anchor", "end")
			    .attr("y", h - 20)
			    .attr("x", w)
			    .attr("class", "percentagearc-text")
			    .attr("fill", color1)
			    .style("font-size", "26pt")
			    .text(noData ? "--" : d3.format(".0%")(value));
	    	
	    	//RENDER LEGEND ----------------------
	    	
	    	var cols = this.model.get("legendNumCols") || 2;
	    	var rows = Math.floor(2/cols);
	    	
	    	var legend = new Legend({ labels: [ this.model.get("yAxisCol1"),
	    	                                    this.model.get("yAxisCol2")]
	    							, colors: [ color1, color2 ]
	    							, numCols: cols, numRows: rows });
	    	var legendView = new LegendView({model: legend});
	    	
	    	this.$('.chart-legend').html(legendView.render().el);
	    	
	    	
		      return this;
	    },
	    
	    
	    select: function(selection) {
	    	this.model.set({"currentRow": selection});
	    }
	    
  });