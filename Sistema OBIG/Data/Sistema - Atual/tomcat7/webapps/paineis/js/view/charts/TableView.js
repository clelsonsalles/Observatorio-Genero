/**
 * View that renders a Table
 * 
 */
var TableView = Backbone.View.extend({

		//initial values here are static (shared between instances)
	
		tagName: "div",
		template: null,
			
		selected: null,
		
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			this.template = _.template($('#table-chart-template').html());
			this.listenTo(this.model, 'change', this.render);
			
			Global.eventBus.on("view:selection", this.select, this);
			
			/*var self = this;
			//Load the SVG file and re-render when loaded
			d3.xml(this.model.get("icon"), "image/svg+xml", function(error, xml) {
				  //get the root SVG									
				  self.iconNode = xml.documentElement;
				  self.render();
				});*/
		},
		
		//Render app
	    render: function() {
		      
	    	
	    	
	    	//get model attributes
	    	var w = this.model.get("width");
	    	
	    	//set size
	    	d3.select(this.el)
		    	.attr("class", "chart-container")
		    	.style("width", w + "px");
		    	
	    	
    		this.model.updateRows(this.selected);
    	
	    	//render container template
	    	this.$el.html(this.template(this.model.toJSON()));    
	    	
	    	var alreadySelected = this.selected;
	    	
	    	this.$('.table-row-text').click(function() {
	    		//get the name of the row clicked
	    		var newSelection = $(this).text();
	    		//if the user clicks again, remove the selection
	    		if (newSelection == alreadySelected)
	    			newSelection = null;
	    		
    		//trigger element selection
    		Global.navigator.navigate(null, newSelection);
    	
	    	});
	    	
	    	
		      return this;
	    },
	    
	    
	    select: function(selection) {
	    	this.selected = selection;
	    	this.render();
	    }
	    
  });