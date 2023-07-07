/**
 * 
 */
var SelectionBox  = Backbone.Model.extend({

	
    // Default attributes
    defaults: function() {
      return {
        svgReference: null,
        postioning: "top-right", //top-left, top-right, bottom-left, bottom-right
        title: "Title",
        values: [], //array of { name: Str, value: Str }, value should be already formatted string
        fromPoint: null // { x: , y: } draw a line from this point, if any
      };
    },
    
    initialize: function() {
    	this.set({
    				"svgReference": this.get("svgReference") || this.defaults().svgReference,
    				"postioning": this.get("postioning") || this.defaults().postioning,
    				"title": this.get("title") || this.defaults().title,
    				"prefix": this.get("prefix") || this.defaults().prefix,
    				"suffix": this.get("suffix") || this.defaults().suffix,
    				"value": this.get("value") || this.defaults().value,
    				"format": this.get("format") || this.defaults().format
    			});
    	
    }

  });