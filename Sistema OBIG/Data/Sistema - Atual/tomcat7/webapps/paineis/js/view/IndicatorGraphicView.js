/**
 * View an indicator as a set of charts
 * 
 */
var IndicatorGraphicView = Backbone.View.extend({

		tagName: "div",
		template: null,
		
		chartViews: null,
		
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			this.template = _.template($('#indicator-template').html());
			
			this.chartViews = new Array();
			var charts = this.model.get("charts");	    	
	    	_.each(charts, this.createViews, this);
	    	
	    	
	    	Global.eventBus.on("view:selection", this.select, this);
		},
		
		createViews: function(chartModel)
		{
			this.chartViews.push(ChartViewFactory.getView(chartModel));
		},
		
		//Render app
	    render: function() {
		      
	    	
	    	//render container template
	    	this.$el.html(this.template(this.model.toJSON()));     
	    	this.$el.addClass("indicator-container");
	    		    	
	    	this.$('.indicator-title').html(this.model.get("name"));
	    	this.$('.indicator-footer').html("<b>Fonte:</b> " + this.model.get("source"));
	    	
	    	//set up jQuery UI's tooltip
	    	this.$el.tooltip({
	  	      track: true,
	  	      collision: "flipfit",
	  	      show: 0,
	  	      hide: 0,
	  	      content: function () {    
	  	          return d3.select(this).attr("title");
	  	      }
	  	    });
	    	
	    	_.each(this.chartViews, function(v) {
	    		
	    		if (v == LINE_BREAK) //visual line break
	    			this.$('.indicator-visualization').append('<div style="clear:both"></div>');
	    		else
	    			this.$('.indicator-visualization').append(v.render().el);
	    		
	    	}, this);
	    	
	    	
	    	
		      return this;
	    },
	    
	    select: function(selection) {
	    	if (selection)
	    	{
	    		this.$('.indicator-filter-text').text(selection);
	    		this.$('.indicator-filter-text').css("visibility", "visible");
	    	}
	    	else
	    	{	
	    		this.$('.indicator-filter-text').text("");
	    		this.$('.indicator-filter-text').css("visibility", "hidden");
	    	}
	    }
  });