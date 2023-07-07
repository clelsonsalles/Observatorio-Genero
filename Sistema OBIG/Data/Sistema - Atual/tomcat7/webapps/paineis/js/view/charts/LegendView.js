/**
 * View that renders a Legend
 * 
 */
var LegendView = Backbone.View.extend({

		//initial values here are static (shared between instances)
	
		tagName: "div",
		template: null,
		
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			this.template = _.template($('#legend-template').html());
			this.listenTo(this.model, 'change', this.render);
			
		},
		
		//Render app
	    render: function() {
		      
	    	
	    	//render container template
	    	this.$el.html(this.template(this.model.toJSON()));     	
	    		    	
	    	
		      return this;
	    }
  });