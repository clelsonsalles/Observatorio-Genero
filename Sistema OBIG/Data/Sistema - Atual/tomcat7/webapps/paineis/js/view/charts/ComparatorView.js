/**
 * View that renders a Comparator
 * 
 */
var ComparatorView = Backbone.View.extend({

		//initial values here are static (shared between instances)
	
		tagName: "div",
		template: null,
		
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			this.template = _.template($("#comparator-template").html());
			this.listenTo(this.model, 'change', this.render);
			
			Global.eventBus.on("view:selection", this.select, this);
			
		},
		
		//Render app
	    render: function() {
	    	
	    	
	    	var content = this.model.content();
	    	
	    	//render container template
	    	this.$el.html(this.template(content));     	
	    	
	    		    	
	    	
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
	    	}
	    	else
	    	{
	    		filters.selected = null;
	    	}
	    	
	    	this.model.set({"currentRow": selection, "filters" :filters});
	    }
  });