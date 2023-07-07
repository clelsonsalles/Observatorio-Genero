/**
 * View that renders a selection (info) box inside another chart (SVG)
 * 
 */
var SelectionBoxView = Backbone.View.extend({

			
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			this.listenTo(this.model, 'change', this.render);
			
		},
		
		//Render app
	    render: function() {
		      
	    	var svgReference = this.model.get("svgReference");
	    	
	    	if (svgReference)
	    	{
	    		var w = svgReference.attr("width"),
	    			h = svgReference.attr("height");
	    		
	    		var positioning = this.model.get("positioning");
	    		
	    		var centerX = 0,
	    			centerY = 0;
	    		
	    		var boxWidth = 100,
	    			boxHeight = 70;
	    		
	    		if (positioning == "top-left")
	    		{
	    			centerX = w/4;
	    			centerY = h/4;
	    		}
	    		else
    			if (positioning == "top-right")
	    		{
	    			centerX = 3*w/4;
	    			centerY = h/4;
	    		}
	    		else
    			if (positioning == "bottom-left")
	    		{
	    			centerX = w/4;
	    			centerY = 3*h/4;
	    		}
	    		else
    			if (positioning == "bottom-right")
	    		{
	    			centerX = 3*w/4;
	    			centerY = 3*h/4;
	    		}
	    		
	    		//append elements and then resize as needed	 
	    		var g = svgReference.append("g");
	    		
	    		var rectRef = g.append("rect")
	    			.attr("class", "selection-box")
	    			.attr("width", boxWidth)
	    			.attr("height", boxHeight)
	    			.attr("x", 0)
	    			.attr("y", 0);
	    		
	    		g.append("text")
	    			.attr("class", "selection-box-title")
	    			.attr("x", 10)
	    			.attr("y", 20)
			        .text(this.model.get("title"));
	    		
	    		var nextPos = 40;
	    		
	    		// array of { name: Str, value: Str }
	    		var valuesToDisplay = this.model.get("values");
	    		
	    		valuesToDisplay.forEach(function (item) {
	    			g.append("text")
		    			.attr("class", "selection-box-values")
		    			.attr("x", 10)
		    			.attr("y", nextPos)
				        .text(item.name + ": " + item.value);
	    			nextPos += 20;
	    		});
	    		
	    		var size = g.node().getBBox();
	    		
	    		boxWidth = size.width + 10;
	    		boxHeight = (boxHeight > size.height ? boxHeight : size.height);
	    		
	    		rectRef.attr("width", boxWidth)
	    				.attr("height", boxHeight);
	    		
	    		g.attr("transform", "translate(" + (centerX - boxWidth/2) + ", " + (centerY - boxHeight/2) + ")");
	    		
	    		//line
	    		/*var fromPoint = this.model.get("fromPoint");
	    		
	    		if (fromPoint)
	    		{
			    	svgReference
			    		.append("line")
			    		.attr("class", "selection-box")
			    		.attr("x1", fromPoint.x)
			    		.attr("y1", fromPoint.y)
			    		.attr("x2", (centerX - boxWidth/2))
			    		.attr("y2", (centerY - boxHeight/2));
	    		}*/
	    		
	    		return g;
	    		
	    	}
	    		    	
	    	
		      return this;
	    }
  });