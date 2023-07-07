/**
 * View that renders the Indicators' catalog
 * 
 */
var CatalogView = Backbone.View.extend({

		tagName: "div",
		template: null,
		
		
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			this.template = _.template($('#catalog-template').html());
			
			Global.eventBus.on("view:selection", this.select, this);
		},
		
		//Render app
	    render: function() {
		      
	    	//render container template
	    	this.$el.html(this.template(this.model.toJSON()));     
	    	this.$el.addClass("full-size-container");
	    	
	    	var activeName;
	    	var activeIndex; //search the catalog to get the index of the active indicator
	    	
	    	this.$('.catalog-container').accordion({
	    	      collapsible: true,
	    	      heightStyle: "content"
	    	    	  /* active: activeIndex */
	        });
	    	
	    	
	    	return this;
	    },
	    
	    select: function(selection) {
	    	if (selection)
	    	{
	    		var activeIndex = 0;
	    			    		
	    		$(".ui-accordion-header").each(function (i, node) {
	    				if ($(node).text() == selection) activeIndex = i;
	    			});
	    		
	    		$( ".catalog-container" ).accordion( "option", "active", activeIndex );
	    	}
	    	
	    }
  });