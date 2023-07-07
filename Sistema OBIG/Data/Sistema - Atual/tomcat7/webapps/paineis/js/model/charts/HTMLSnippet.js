/**
 * 
 */
var HTMLSnippet  = Backbone.Model.extend({

	chartType: "HTMLSnippet",
	
    // Default attributes
    defaults: function() {
      return {
        template: "<p>Snippet</p>"
      };
    },
    
    initialize: function() {
    	this.set({
    				"template": this.get("template") || this.defaults().template
    			});
    	
    }

  });