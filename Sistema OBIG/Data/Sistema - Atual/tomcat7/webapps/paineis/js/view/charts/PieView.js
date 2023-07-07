/**
 * View that renders a Pie
 * 
 */
var PieView = Backbone.View.extend({

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
	    	
	    	
	    	//get model attributes
	    	var w = this.model.get("width");
	    	var h = this.model.get("height");
	    	var canvasH = h*0.85;
	    	
	    	var labelPosition = this.model.get("labelPosition"); //inner or outer
	    	var tooltips = this.model.get("tooltips");
	    	var order = this.model.get("order"); //slice ordering
	    	var decimals = this.model.get("decimals");
	    	
	    	var prefix = this.model.get("prefix") || "";
	    	var suffix = this.model.get("suffix") || "";
	    	var numberFormat = this.model.get("numberFormat") || ".2s";
	    	
	    	var newDOM = document.createElement( "div" ); 
	    	this.$("svg").after(newDOM);
	    	
	    	this.$("svg").remove();
	    	
	    	// [ { label: "", value: nn } ] 
	    	var content = this.model.content();
	    	
	    	
	    	
	    	if (content.length != 0) {
		    		
		    	this.pie = new d3pie(newDOM, {
		    		header: {
		    			
		    		},
		    		footer: {
		    			text: 	  "",
		    			color:    "#666666",
		    			fontSize: 14,
		    			font:     "arial",
		    			location: "left"
		    		},
		    		size: {
		    			canvasHeight: canvasH,
		    			canvasWidth: w,
		    			pieInnerRadius: (labelPosition == "outer") ? '60%' : '30%',
		    			pieOuterRadius: null
		    		},	    		
		    		labels: {
		    			outer: {
		    				format: (labelPosition == "outer") ? "label-percentage1" : "label",
		    				pieDistance: 20
		    			},
		    			inner:  (labelPosition == "inner") ? { } : { format: "none" }
		    			,
		    			mainLabel: {
		    				color: "#333333",
		    				font: "arial",
		    				fontSize: 10
		    			},
		    			percentage: {
		    				color: (labelPosition == "inner") ? "#FFFFFF" : "#0000EE",
		    				decimalPlaces: decimals,
		    				fontSize: (labelPosition == "inner") ? "10" : "12",
		    						hideWhenLessThanPercentage: null
		    			},
		    			value: {
		    				color: "#cccc44",
		    				font: "arial",
		    				fontSize: 10
		    			},
		    			lines: {
		    				enabled: true,
		    				style: "curved",
		    				color: "segment"
		    			},
		    			truncation: {
		    				enabled: false,
		    				truncateLength: 30
		    			},
		    	    formatter: null
		    		},
		    		data: {
		    			sortOrder: order,
		    			ignoreSmallSegments: {
		    				enabled: false,
		    				valueType: "percentage",
		    				value: null
		    			},
		    			smallSegmentGrouping: {
		    				enabled: false,
		    				value: 1,
		    				valueType: "percentage",
		    				label: "Other",
		    				color: "#cccccc"
		    			},
		    			content: content
		    		},
		    		effects: {
		    			load: {
		    				effect: "default",
		    				speed: 1000
		    			},
		    			pullOutSegmentOnClick: {
		    				effect: "bounce",
		    				speed: 300,
		    				size: 10
		    			},
		    			highlightSegmentOnMouseover: true,
		    			highlightLuminosity: -0.2
		    		},
		    		tooltips: {
		    		    enabled: (tooltips == "false") ? false : true,
		    		    type: "placeholder",
		    		    string: "{label}: " + prefix + " {value} " + suffix,
		    		    
		    		    placeholderParser: function(index, data) {
		    		    		    	
		    		        //data.label = data.label + "";
		    		        //data.percentage = data.percentage.toFixed(2);
		    		        data.value = data.value.toLocaleString('latn');		    		    	
		    		    },
		    		    styles: {
		    		    	fontSize: 11,
		    		    	display: "none",
		    		    	backgroundColor:  "#ffffff",
		    		        backgroundOpacity: 100,
		    		  		color: "#000000",
		    		    	left: 130,
		    		    	padding: 10,
		    		    	position: "fixed",
		    		    	top: 95,
		    		    	width: 80,
		    		    	position: "relative",
		    		    	borderRadius: 5,
		    		    	fadeInSpeed: 250,
		    		    	boxShadow: "black 0.5em 0.5em 0.3em"
		    		    }
		    		},
		    			misc: {
		    				colors: {
		    					background: null,
		    					segments: [
		    						"#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a", "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a",
		    						"#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a", "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
		    						"#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e", "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
		    						"#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c", "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
		    						"#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b", "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7"
		    					],
		    					segmentStroke: "#ffffff"
		    				},
		    				gradient: {
		    					enabled: false,
		    					percentage: 95,
		    					color: "#000000"
		    				},
		    				canvasPadding: {
		    					top: 5,
		    					right: 5,
		    					bottom: 30,
		    					left: 5
		    				},
		    				pieCenterOffset: {
		    					x: 0,
		    					y: 0
		    				},
		    				cssPrefix: null
		    			},
		    			callbacks: {
		    				onload: null,
		    				onMouseoverSegment: null,
		    				onMouseoutSegment: null,
		    				onClickSegment: null
		    			}
		    		  
		    	});
		    	
	    	
	    	}
	    	else
	    	{
	    		
	    		d3.select(newDOM)
	    			.style("height", canvasH + "px")
	    			.append("span")
		    			.attr("class", "pie-chart-msg")
		    			.text(Lang.NO_DATA[Settings.Language]);
	    	}
	    		    	

	    	
	    		
	    		  
	    	//set up container
    		d3.select(this.el)
	    		.attr("class", "chart-container")
    			.style("width", (w + 10) + "px");
	    		

	    	
		      return this;
	    },
	    
	    
	    select: function(selection) {
	    	var filters = this.model.get("filters");
    		if (filters == null) filters = { selected: null };
    		
	    	if (selection)
	    	{
		    	//if no selection Col provided, select on the X axis
		    	var selectionCol = this.model.get("selectionAxisCol") || this.model.get("xAxisCol");
		    	var selectionVal = selection;
		    			    	
		    	filters.selected = [ { column: selectionCol, value: selectionVal }];
		    	
		    	this.model.set({"filters": filters}); //setting the same object will not trigger change
		    	this.model.trigger("change");  //trigger change event
	    	}
	    	else
	    	{
	    		
	    		filters.selected = null;
	    		this.model.set({"filters": filters});
	    		this.model.trigger("change");  //trigger change event
	    	}
	    	
	    }
	    	
  });