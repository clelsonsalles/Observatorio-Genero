/**
 * 
 */
var Pie  = Backbone.Model.extend({

	chartType: "Donut",
	
    // Default attributes
    defaults: function() {
      return {
        width: 280,
        height: 280,
        title: 'Indicator',
        colors: ['#522900','#8F4700','#CC6600','#DB944D','#EBC299'],
        decimals: 0,
        data: [],
        type: "column",
        xAxisCol: "UF",
        yAxisCol: "Jovens com Muito Baixa Escolaridade",
        labelPosition: "inner",
        order: "none" //d3pie ordering (none, random, value-asc, value-desc, label-asc, label-desc)
      };
    },
    
    initialize: function() {
    	this.set({
    				"width": this.get("width") || this.defaults().width,
    				"height": this.get("height") || this.defaults().height,
    				"title": this.get("title") || this.defaults().title,
    				"info": this.get("info") || this.defaults().info,
    				"colors": this.get("colors") || this.defaults().colors,
    				"decimals": this.get("decimals") || this.defaults().decimals,
    				"type": this.get("type") || this.defaults().type,
    				"data": this.get("data") || this.defaults().data,
    				"xAxisCol": this.get("xAxisCol") || this.defaults().xAxisCol,
    				"yAxisCol": this.get("yAxisCol") || this.defaults().yAxisCol,
    				"labelPosition": this.get("labelPosition") || this.defaults().labelPosition,
    				"order": this.get("order") || this.defaults().order
    			});
    	
    },
    
    content: function() {
    	
    	var xAxisCol = this.get("xAxisCol");
    	var yAxisCol = this.get("yAxisCol");
    	
    	var colors = this.get("colors");
    	var paletteSize = colors.length;
    	
    	// [ { label: "", value: nn } ] 
    	var content = new Array();
    		    	
    	var data = this.get("data");
    	
    	var i = 0;
    	
    	data.forEach(function (row) {
    		
    		var skip = false;
    		
    		if (this.has("filters"))
    		{
    			var filters = this.get("filters");
    			
    			skip = !DataUtils.isIncluded(row, filters);
    		}
    		
    		
    		if (!skip)
    		{	
	    		var label = row[xAxisCol];
	    		var n = +row[yAxisCol];
		    	
	    		content.push({ label: label, value: n, color: colors[i % paletteSize] });
	    		
	    		i++;
    		}
    		
    	}, this);
    	
    	return content;
    }

  });