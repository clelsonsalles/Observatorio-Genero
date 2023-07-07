/**
 * 
 */
var Catalog  = Backbone.Model.extend({

	
	
    // Default attributes
    defaults: function() {
      return {
        metadata: {},
        indicators: []
      };
    },
    
    initialize: function() {
    	this.set({
    				"metadata": this.get("metadata") || this.defaults().metadata,
    				"indicators": this.get("indicators") || this.defaults().indicators
    			});
    	
    }

  });