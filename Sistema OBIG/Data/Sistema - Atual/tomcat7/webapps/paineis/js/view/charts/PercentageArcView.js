/**
 * View that renders a PercentageArc
 * 
 */
var PercentageArcView = Backbone.View.extend({

		//initial values here are static (shared between instances)
	
		tagName: "div",
		template: null,
				
		arcGenerator: null,
		svgReference: null,
		pieReference: null,
		pieTextReference: null,
		pieBackReference: null,
				
		twoPi: 2*Math.PI,
		
		
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
	    	var color = this.model.get("color");
	    	
	    	
	    	
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
	    	
	    	var size = Math.min(w,h)/1.7;
	    	
	    	
	    	//draw arcs
	    	this.arcGenerator = d3.svg.arc()
	    	    .startAngle(0)
	    	    .innerRadius(size * 0.55)
	    	    .outerRadius(size * 0.80);
	    	
	    	var pie = this.svgReference
	    		.append("g")
	    		.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
	    	
	    	//append the background (full) pie
	    	this.pieBackReference = pie.append("path")
	    		.attr("class", "percentagearc-backgroundpie")
	    		.attr("d", this.arcGenerator.endAngle(this.twoPi));
	    		//.attr("title", "Nome Total");
	    	
	    	this.pieReference = pie.append("path")
	    		.attr("class", "percentagearc-pie")
	    		.style("fill", color)
	    		.attr("title", this.model.get("yAxisCol") + ": " + d3.format(".2%")(value))
	    		//.attr("title", this.model.get("yAxisCol") + ": " + d3.format(".2%")(value) + " (" + d3.format(",.0f") (absolute) + ")")
	    		//.attr("d", this.arcGenerator.endAngle(this.twoPi * value));
	    		.transition()
	    		.duration(500)
	    		.attrTween("d", (function(view) {
	    			return function(d)
	    			{
	    				var interpolate = d3.interpolate(0, view.twoPi*value);
	    				return function(t) //interpolator function to use in the tween
	    				{
	    					return view.arcGenerator.endAngle(interpolate(t))();
	    				};
	    			};
	    		})(this));
	    	
	    	
	    	
	    	this.pieTextReference = pie.append("text")
	    				.attr("text-anchor", "middle")
	    			    .attr("dy", ".35em")
	    			    .attr("y", -size*0.1)
	    			    .attr("class", "percentagearc-text")
	    			    .style("fill", color)
	    			    .style("font-size", size*0.30 + "px")
	    			    .text(d3.round(value*100));
	    	
	    	//percent sign % text
	    	pie.append("text")
	    			.attr("text-anchor", "middle")
	    		    .attr("dy", ".35em")
	    		    .attr("x", 0)
	    		    .attr("y", size*0.15)
	    		    .attr("class", "percentagearc-text")
	    		    .style("fill", color)
	    		    .style("font-size", size*0.20 + "pt")
	    		    .text("%");
	    	
		      return this;
	    },
	    
	    
	    select: function(selection) {
	    	this.model.set({"currentRow": selection});
	    }
  });