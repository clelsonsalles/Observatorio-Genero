/**
 * View that renders an RowValue
 * 
 */
var RowValueView = Backbone.View.extend({

		//initial values here are static (shared between instances)
	
		tagName: "div",
		template: null,
		
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			//this.template = _.template($(this.model.get("template")).html());
			this.listenTo(this.model, 'change', this.render);
			
			Global.eventBus.on("view:selection", this.select, this);
			
		},
		
		//Render app
	    render: function() {

	    	var content = this.model.content();
	    	
	    	var html = "<div class='htmlBox' style='background-color: " +
	    			this.model.get("background") +
	    			"; color: " +
	    			this.model.get("color") +
	    			";'>" +
	    			(this.model.get("icon") 
	    					? "<img src='"+ this.model.get("icon") +"' style='float:left;padding:10px 20px 10px 10px;'></img>" 
	    					: "" ) +
	    			"<h2 style='text-align: left; padding-top: 10px; padding-left: 20px; margin: 0px;'>" +
	    			content.name +
	    			"</h2><h1 style='margin: 0px; padding-top: 0px; padding-right: 5px; text-align: right;'>" +
	    			"<span class='rowvalue-prefix'>" + content.prefix + "</span> "
	    			+ content.value +
	    			" <span class='rowvalue-suffix'>" + content.suffix + "</span> " +
	    			"</h1><div style='clear: both'/></div>";
	    	
	    	//render container template
	    	//this.$el.html(this.template(this.model.toJSON()));     	
	    	this.$el.html(html);
	    		    	
	    	
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