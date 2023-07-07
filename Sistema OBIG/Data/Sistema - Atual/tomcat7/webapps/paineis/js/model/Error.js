/**
 * 
 */
var Error  = Backbone.Model.extend({

	
	
    // Default attributes
    defaults: function() {
      return {
        error: 'Error.',
        details: 'No details.'
      };
    },
    
    initialize: function() {
    	this.set({
    				"error": this.get("error") || this.defaults().error,
    				"details": this.get("details") || this.defaults().details
    			});
    	
    }

  });