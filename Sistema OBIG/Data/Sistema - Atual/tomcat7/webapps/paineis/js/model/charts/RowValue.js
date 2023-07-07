/**
 * 
 */
var RowValue  = Backbone.Model.extend({

	chartType: "RowValue",
	
    // Default attributes
    defaults: function() {
      return {
        width: 200,
        height: 180,
        color: '#666',
        background: '#EEE',
        icon: null,
        defaultRow: null, //if none is set, the first row in the data is taken
        defaultLabel: null, //change the name of the default row when displaying
        currentRow: null, //filters may temporarily set another row
        xAxisCol: "", //the name of the categories column
        yAxisCol: "", // the value will be defined by this column
        prefix: "", //printed before the value
        suffix: "", //printed after the value
        numberFormat: ".0f"
      };
    },
    
    initialize: function() {
    	this.set({
    				"width": this.get("width") || this.defaults().width,
    				"height": this.get("height") || this.defaults().height,
    				"title": this.get("title") || this.defaults().title,
    				"color": this.get("color") || this.defaults().color,
    				"background": this.get("background") || this.defaults().background,    				
    				"defaultRow": this.get("defaultRow") || this.defaults().defaultRow,
    				"defaultLabel": this.get("defaultLabel") || this.defaults().defaultRow, //<-- use row name
    				"currentRow": this.get("currentRow") || this.defaults().currentRow,
    				"xAxisCol": this.get("xAxisCol") || this.defaults().xAxisCol,
    				"yAxisCol": this.get("yAxisCol") || this.defaults().yAxisCol,
    				"prefix": this.get("prefix") || this.defaults().prefix,
    				"suffix": this.get("suffix") || this.defaults().suffix,
    				"numberFormat": this.get("numberFormat") || this.defaults().numberFormat
    			});
    	
    },
    
    
    content: function()
    {
    	
    	var xAxisCol = this.get("xAxisCol");
    	var yAxisCol = this.get("yAxisCol");
    	
    	var targetCategory = this.has("currentRow") ? this.get("currentRow")
    										: this.get("defaultRow");
    	
    	var nameLabel = this.has("currentRow") ? this.get("currentRow")
    										: this.get("defaultLabel");
    	
    	var prefix = this.get("prefix") || "";
    	var suffix = this.get("suffix") || "";
    	var numberFormat = this.get("numberFormat");
    	
    	//if there is data, compute the value
    	if (this.has("data"))
    	{
    		//search row
    		var dataArray = this.get("data");
    		
    		for (var ri = 0; ri < dataArray.length; ri++)
    		{
    			var row = dataArray[ri];
    			
    			if (DataUtils.isIncluded(row, this.get("filters")))
    			{    				
	    			if (targetCategory == null || row[xAxisCol] == targetCategory)
	    			{
	    				var y = +row[yAxisCol];
	    				var value = null;
	    				
	    				if (isNaN(y))
	    		    		value = "--";
	    				else
	    					value = d3.format(numberFormat)(y);
	    		    	
	    				return { name: nameLabel, prefix: prefix, value: value, suffix: suffix };
	    			}
    			}
    		}
    		
    		return { name: nameLabel, prefix: "", value: "--", suffix: "" }; //no row found
    		
    	}
    	else return { name: nameLabel, prefix: "", value: "--", suffix: "" }; //no data
    	
    	
    }

  });