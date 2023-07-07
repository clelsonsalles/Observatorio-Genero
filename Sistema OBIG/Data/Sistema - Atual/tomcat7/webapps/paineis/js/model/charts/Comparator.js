/**
 * 
 */
var Comparator  = Backbone.Model.extend({

	chartType: "Comparator",
	
    // Default attributes
    defaults: function() {
      return {
        width: '100%',        
        color: '#666',
        background: '#EEE',        
        priorRow: null, //row containing the previous value to compare
        posteriorRow: null, //row containing the posterior value. Difference is (posterior-prior).
        xAxisCol: "", //the name of the categories column
        yAxisCol: "", // the value will be defined by this column
        selectionAxisCol: "",
        defaultRow: null, //which how corresponds to the default selection in the selectionAxis
        currentRow: null, //row corresponding to the current selection
        label: "",
        percentage: true, //whether the difference should be shown as percentage or absolute
        decimals: 0
      };
    },
    
    initialize: function() {
    	this.set({
    				"width": this.get("width") || this.defaults().width,
    				"height": this.get("height") || this.defaults().height,
    				"color": this.get("color") || this.defaults().color,
    				"background": this.get("background") || this.defaults().background,    				
    				"priorRow": this.get("priorRow") || this.defaults().priorRow,
    				"posteriorRow": this.get("posteriorRow") || this.defaults().posteriorRow,
    				"xAxisCol": this.get("xAxisCol") || this.defaults().xAxisCol,
    				"yAxisCol": this.get("yAxisCol") || this.defaults().yAxisCol,
    				"selectionAxisCol": this.get("selectionAxisCol") || this.defaults().selectionAxisCol,    				
    				"defaultRow": this.get("defaultRow") || this.defaults().defaultRow,
    				"currentRow": this.get("currentRow") || this.defaults().currentRow,
    				"label": this.get("label") || this.defaults().label,
    				"decimals": this.get("decimals") || this.defaults().decimals,
    				"percentage": this.get("percentage") || this.defaults().percentage
    			});
    	
    },
    
    
    content: function()
    {
    	
    	var xAxisCol = this.get("xAxisCol");
    	var yAxisCol = this.get("yAxisCol");
    	var selectionAxisCol = this.get("selectionAxisCol");
    	
    	var priorRow = this.get("priorRow");
    	var posteriorRow = this.get("posteriorRow");
    	
    	var targetCategory = this.has("currentRow") ? this.get("currentRow")
    										: this.get("defaultRow");
    	
    	var decimals = this.get("decimals");
    	var numberFormat = this.get("percentage") == true ? '+.' + decimals + '%' : '+.' + decimals + 'f';
    	
    	//if there is data, compute the value
    	if (this.has("data"))
    	{
    		//search row
    		var dataArray = this.get("data");
    		
    		var prior = null;
    		var posterior = null;
    		var diff = null;
    		
    		for (var ri = 0; ri < dataArray.length; ri++)
    		{
    			var row = dataArray[ri];
    			
    			if (DataUtils.isIncluded(row, this.get("filters")))
    			{    				
	    			if (targetCategory == null || row[selectionAxisCol] == targetCategory)
	    			{
	    				//is it prior, posterior, or none?
	    				if (row[xAxisCol] == priorRow)
	    				{
	    					prior = parseFloat(row[yAxisCol]);
	    					
	    					if (isNaN(prior)) prior = null;
	    				}
	    				else
	    				if (row[xAxisCol] == posteriorRow)
	    				{
	    					posterior = parseFloat(row[yAxisCol]);
	    					
	    					if (isNaN(posterior)) posterior = null;
	    				}
	    				
	    				//do we have both already?
	    				if (prior != null && posterior != null)
	    				{
	    					diff = posterior - prior;
	    					
	    					if (this.get("percentage")) diff = diff / prior;
	    					

		    				var valueFormatted = d3.format(numberFormat)(diff)
									    					.replace(/\./g, "_")
									    					.replace(/,/g, ".")
									    					.replace(/_/g, ",");
		    		    	
		    				return { 
		    						valueFormatted: valueFormatted,
		    						symbol: diff >= 0 ? 'svg/symbols/upload119.svg' : 'svg/symbols/download164.svg', 
		    						text: this.get("label"),
		    						widthFormatted: this.get("width"),
		    						background: this.get("background"),
		    						color: this.get("color")
		    						};
	    				}
	    				
	    			}
    			}
    		}
    		
    		return { 
				valueFormatted: '--',
				symbol: 'svg/symbols/upload119.svg', 
				text: this.get("label"),
				widthFormatted: this.get("width"),
				background: this.get("background"),
				color: this.get("color")
				}; //no row found or rows dont contain numbers
    		
    	}
    	else return { 
			valueFormatted: '--',
			symbol: 'svg/symbols/upload119.svg', 
			text: this.get("label"),
			widthFormatted: this.get("width"),
			background: this.get("background"),
			color: this.get("color")
			}; //no data
    	
    	
    }

  });