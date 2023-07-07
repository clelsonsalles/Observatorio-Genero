/**
 * 
 */
var Table  = Backbone.Model.extend({

	chartType: "Table",
	
    // Default attributes
    defaults: function() {
      return {
        width: 315,
        title: 'Table',
		xAxisCol: 'Name',		
		yAxisCol: 'Value',
		percAxisCol: null, //if null, the bars will be based on yAxisCol
		axis: [0, 100], //if there is no percAxisCol, bars will be proportional to the axis
		format: '.0f',
		columnWidth: [ 150, 100, 60 ],
		columnLabels: null, //[ c1, c2, c3 ] display these labels instead of the column names. INITIALIZED to the axis names if null.
		rows: [],
		colorizeModel: null, //an object { intervals: [ [>=X, <Y] ..], colors: []}
      };
    },
    
    initialize: function() {
    	
    	var labels;
    	if (!this.get("columnLabels"))
    		labels = [ this.get("xAxisCol") || this.defaults().xAxisCol,
    		           this.get("yAxisCol") || this.defaults().yAxisCol,
    		           this.get("percAxisCol") || "" ];
    	else
    		labels = this.get("columnLabels");
    	
    	this.set({
    				"width": this.get("width") || this.defaults().width,
    				"title": this.get("title") || this.defaults().title,
    				"xAxisCol": this.get("xAxisCol") || this.defaults().xAxisCol,
    				"yAxisCol": this.get("yAxisCol") || this.defaults().yAxisCol,
    				"percAxisCol": this.get("percAxisCol") || this.defaults().percAxisCol,
    				"columnLabels": labels, // <-- computed labels
    				"nameColumn": this.get("nameColumn") || this.defaults().nameColumn,
    				"valueColumn": this.get("valueColumn") || this.defaults().valueColumn,
    				"barColumn": this.get("barColumn") || this.defaults().barColumn,
    				"columnWidth": this.get("columnWidth") || this.defaults().columnWidth,
    				"rows": this.get("rows") || this.defaults().rows,
    				"axis": this.get("axis") || this.defaults().axis,
    				"format": this.get("format") || this.defaults().format,
    				"colorizeModel": this.get("colorizeModel") || this.defaults().colorizeModel
    			});
    	
    },
    
    updateRows: function(nameSelected) {
    	
    	if (this.has("data"))
    	{
    		//search row
    		var dataArray = this.get("data");
    		var xAxisCol = this.get("xAxisCol");
    		var yAxisCol = this.get("yAxisCol");
    		var percAxisCol = this.get("percAxisCol");
    		var axis = this.get("axis");
    		var colorizeModel = this.get("colorizeModel");
    		var columnWidth = this.get("columnWidth");
    		
    		var intervals = colorizeModel.intervals; //clone because we may change it
    		var colors = colorizeModel.colors;
    		var adjustedIntervals = null;
    		
    		
			//if we are not working with a percentage axis,
			// the intervals are defined regarding the yAxis. Thus
			// we need to adjust the proportions to make it percentage-like
			if (!percAxisCol)
			{
				adjustedIntervals = new Array(intervals.length);
				
    			for (var i = 0; i < intervals.length; i++)
				{
    				adjustedIntervals[i] = new Array(2);
    				
					adjustedIntervals[i][0] = (intervals[i][0] - axis[0])/(axis[1] - axis[0]);
					adjustedIntervals[i][1] = (intervals[i][1] - axis[0])/(axis[1] - axis[0]);
				}
			}
			else
				adjustedIntervals = intervals;
    		
    		var rows = new Array();
    		
    		for (var ri = 0; ri < dataArray.length; ri++)
    		{
    			var row = dataArray[ri];
    			
    			if (DataUtils.isIncluded(row, this.get("filters")))
    			{    				
	    			var name = row[xAxisCol];
	    			var value;
	    			
	    			if (isNaN(row[yAxisCol]))
	    				//formatted strings
	    				value = row[yAxisCol];
	    			else
	    				//format number
	    				value = d3.format(this.get("format"))(+row[yAxisCol]);
	    			
	    			var perc;
	    			
	    			if (percAxisCol) //do we have a percentage column?
	    			{
	    				perc = parseFloat(row[percAxisCol]); //may be a textual percentage XX%
	    				
	    				if (row[percAxisCol].indexOf("%") > -1) perc = perc / 100.0; //if it is a textual percentage, convert to decimal [0;1]
	    			}
	    			else
	    			{
	    				//the yAxis have the values
	    				// the axis parameter has [min, max] values
	    				if (axis)
	    				{
	    					var width = axis[1] - axis[0];
	    					
	    					perc = (value - axis[0])/width;
	    				}
	    				else
	    					perc = 0; //no axis param, no bars.. sorry!
	    			}
	    			
	    			var color = 'black';
	    				    			
	    			//set colors
	    			for (var i = 0; i < adjustedIntervals.length; i++)
  					{
	    				
  						if (perc >= adjustedIntervals[i][0]
  							&& perc < adjustedIntervals[i][1])
  							 color = colors[i];
  					}
	    			
	    			rows.push({
	    				 name: name,
				    	 value: value,
				    	 perc: d3.format('.1%')(perc),
				    	 width: perc*columnWidth[2],
				    	 color: color,
				    	 selected: name == nameSelected
	    			});
    			}
    		}
    		
    		this.set("rows", rows);	
    	}
    	else
    		this.set("rows", []);
    	
    	//this.trigger("change");
    }

  });