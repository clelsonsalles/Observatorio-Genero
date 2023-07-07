/**
 * 
 */
var Legend  = Backbone.Model.extend({

	
    // Default attributes
    defaults: function() {
      return {
        numRows: 2,
        numCols: 2,
        colors: [],
        labels: []
      };
    },
    
    initialize: function() {
    	this.set({
    				"numRows": this.get("numRows") || this.defaults().numRows,
    				"numCols": this.get("numCols") || this.defaults().numCols,
    				"colors": this.get("colors") || this.defaults().colors,
    				"labels": this.get("labels") || this.defaults().labels
    			});
    	
    },
    
    columnPercentageSize: function() {
    	return (100 / this.get("numRows")) + "%";
    }

  });