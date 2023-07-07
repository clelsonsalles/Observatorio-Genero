/**
 * 
 * 
 */
var ErrorView = Backbone.View.extend({

		tagName: "div",
		template: null,
		
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			this.template = _.template($('#error-template').html());
			
		},
		
		
		//Render app
	    render: function() {
		      
	    	
	    	//render container template
	    	this.$el.html(this.template(this.model.toJSON()));     
	    	this.$el.addClass("error-container");
	    	   	
	    	
	    	
		      return this;
	    },
	    
	    select: function() {
	    	
	    }
  });