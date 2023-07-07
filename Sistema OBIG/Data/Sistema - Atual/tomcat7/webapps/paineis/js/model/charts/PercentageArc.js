/**
 * 
 */
var PercentageArc  = Backbone.Model.extend({

	chartType: "PercentageArc",
	
    // Default attributes
    defaults: function() {
      return {
        width: 180,
        height: 180,
        title: 'Indicator',
        color: '#578ADE',
        defaultRow: null, //if none is set, the first row in the data is taken
        currentRow: null, //filters may temporarily set another row
        xAxisCol: "", //the name of the categories column
        yAxisCol: "", // the value will be defined by (yAxisCol / yTotalCol)*100%
        yTotalCol: null //if yTotalCol is null, its value is considered to be 1.0
        
      };
    },
    
    initialize: function() {
    	this.set({
    				"width": this.get("width") || this.defaults().width,
    				"height": this.get("height") || this.defaults().height,
    				"title": this.get("title") || this.defaults().title,
    				"color": this.get("color") || this.defaults().color,
    				"info": this.get("info") || this.defaults().info,
    				"defaultRow": this.get("defaultRow") || this.defaults().defaultRow,
    				"currentRow": this.get("currentRow") || this.defaults().currentRow,
    				"xAxisCol": this.get("xAxisCol") || this.defaults().xAxisCol,
    				"yAxisCol": this.get("yAxisCol") || this.defaults().yAxisCol,
    				"yTotalCol": this.get("yTotalCol") || this.defaults().yTotalCol
    			});
    	
    },
    
    // returns an object { percentage: p, absolute: a }
    compute: function()
    {
    	var total = 0.0;
    	var part = 0.0;
    	
    	var xAxisCol = this.get("xAxisCol");
    	var yAxisCol = this.get("yAxisCol");
    	var yTotalCol = this.get("yTotalCol");
    	
    	var targetCategory = this.has("currentRow") ? this.get("currentRow")
    										: this.get("defaultRow");
    	
    	//if there is data, compute the value
    	if (this.has("data"))
    	{
    		//search row
    		var dataArray = this.get("data");
    		
    		for (var ri = 0; ri < dataArray.length; ri++)
    		{
    			var row = dataArray[ri];
    			
    			//console.log(targetCategory + " == " + row[xAxisCol]);
    			
    			if (DataUtils.isIncluded(row, this.get("filters")))
    			{     			
	    			if (targetCategory == null || row[xAxisCol] == targetCategory)
	    			{
	    				part = +row[yAxisCol];
	    				total = yTotalCol ? +row[yTotalCol] : 1.0;
	    				
	    				if (total > 0 && !isNaN(part) )
	    		    		return { percentage: (part/total), absolute: part };
	    		    	else
	    		    		return { percentage: 0.0, absolute: 0 }; //total is zero
	    			}
    			}
    		}
    		
    		return { percentage: 0.0, absolute: 0 }; //row not found
    		
    	}
    	else return { percentage: 0.0, absolute: 0 }; //no data
    	
    	
    }

  });