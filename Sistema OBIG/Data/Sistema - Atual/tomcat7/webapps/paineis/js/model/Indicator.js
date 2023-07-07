/**
 * 
 */
var Indicator  = Backbone.Model.extend({

	
	
    // Default attributes
    defaults: function() {
      return {
        name: 'Indicador',
        source: 'SEPPIR/PR',
        charts: [],
        dataUrl: 'csv/juventudeviva.csv',
        columnDelimiter: ',',
        data: [],
      shortToolbar: false
      };
    },
    
    initialize: function() {
    	this.set({
    				"name": this.get("name") || this.defaults().name,
    				"source": this.get("source") || this.defaults().source,
    				"charts": this.get("charts") || this.defaults().charts,
    				"dataUrl": this.get("dataUrl") || this.defaults().dataUrl,
    				"data": this.get("data") || this.defaults().data,
    				"columnDelimiter": this.get("columnDelimiter") || this.defaults().columnDelimiter
    			});
    	
    	this.loadData();
    },
    
    loadData: function()
    {
    	if (!this.has("dataUrl")) return;
    	
    	var self = this;
    	
    	var dsv = d3.dsv(this.get("columnDelimiter"), "text/plain");
    	
    	dsv(this.get("dataUrl"), function(error, data) {
    	    
    		if (data != null)
    		{    			
    			self.set({"data": data});
    			    			
    			//update each chart
    			var charts = self.get("charts");
    			charts.forEach(function (c) { if (c) c.set({"data": data}); });
    		}
    		
    	});
    }

  });