/**
 * 
 */
var People  = Backbone.Model.extend({

	chartType: "People",
	
    // Default attributes
    defaults: function() {
      return {
        width: 200,
        height: 180,
        title: 'Indicator',
        color1: '#FF6600',
        color2: '#578ADE',
        lines: 2,
        columns: 5, //by default 2 lines of 5 people
        defaultRow: null, //if none is set, the first row in the data is taken
        currentRow: null, //filters may temporarily set another row
        xAxisCol: "", //the name of the categories column
        yAxisCol1: "", // the value will be defined by (yAxisCol1 / (yAxisCol1 + yAxisCol2))
        yAxisCol2: "", //if yAxisCol2 is null, its value is considered to be 0.0
        icon: "svg/symbols/standing86.svg",
        scale: 0.3, //default scale for the standing86.svg, overwrite for other symbols
        symbolWidth: 70, //default width for the standing86.svg, overwrite for other symbols
        symbolHeight: 150 //default height for the standing86.svg, overwrite for other symbols
      };
    },
    
    initialize: function() {
    	this.set({
    				"width": this.get("width") || this.defaults().width,
    				"height": this.get("height") || this.defaults().height,
    				"title": this.get("title") || this.defaults().title,
    				"color1": this.get("color1") || this.defaults().color1,
    				"color2": this.get("color2") || this.defaults().color2,
    				"lines": this.get("lines") || this.defaults().lines,
    				"columns": this.get("columns") || this.defaults().columns,
    				"info": this.get("info") || this.defaults().info,
    				"defaultRow": this.get("defaultRow") || this.defaults().defaultRow,
    				"currentRow": this.get("currentRow") || this.defaults().currentRow,
    				"xAxisCol": this.get("xAxisCol") || this.defaults().xAxisCol,
    				"yAxisCol1": this.get("yAxisCol1") || this.defaults().yAxisCol1,
    				"yAxisCol2": this.get("yAxisCol2") || this.defaults().yAxisCol2,
    				"icon": this.get("icon") || this.defaults().icon,
    				"scale": this.get("scale") || this.defaults().scale,
    				"symbolWidth": this.get("symbolWidth") || this.defaults().symbolWidth,
    				"symbolHeight": this.get("symbolHeight") || this.defaults().symbolHeight
    			});
    	
    },
    
    
    compute: function()
    {
    	var total = 0.0;
    	var part = 0.0;
    	
    	var xAxisCol = this.get("xAxisCol");
    	var yAxisCol1 = this.get("yAxisCol1");
    	var yAxisCol2 = this.get("yAxisCol2");
    	
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
    			
    			if (DataUtils.isIncluded(row, this.get("filters")))
    			{    				
	    			if (targetCategory == null || row[xAxisCol] == targetCategory)
	    			{
	    				part = +row[yAxisCol1];
	    				if (yAxisCol2 != null)
	    				{
	    					var rest = +row[yAxisCol2];
	    					total = part + rest;
	    				}
	    				else
	    					total = 1.0;
	    				
	    				if (total > 0 && !isNaN(part) && !isNaN(total))
	    		    		return (part/total);
	    		    	else
	    		    		return 0.0; //total is zero
	    			}
    			}
    		}
    		
    		return null; //row not found
    		
    	}
    	else return null; //no data
    	
    	
    }

  });