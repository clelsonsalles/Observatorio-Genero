/**
 * 
 */
var Plot2D  = Backbone.Model.extend({

	chartType: "Plot2D",
	
    // Default attributes
    defaults: function() {
      return {
        width: 280,
        height: 280,
        title: 'Indicator',
        colors: ['#578ADE', '#2952A3'],
        data: [],
        type: "column",
        xAxisCol: "UF",
        selectionAxisCol: "UF", //view selections will match this column
        hideXAxis: false,
        yAxisCol: ["Jovens com Muito Baixa Escolaridade"], //2D charts may have multiple Y axes        
        hideYAxis: false,
        marginLeft: 30,
        marginBottom: 20,
        xRotation: 0,
        xVisibility: "show",
        filters: null
       
        
      };
    },
    
    initialize: function() {
    	this.set({
    				"width": this.get("width") || this.defaults().width,
    				"height": this.get("height") || this.defaults().height,
    				"title": this.get("title") || this.defaults().title,
    				"info": this.get("info") || this.defaults().info,
    				"colors": this.get("colors") || this.defaults().colors,
    				"type": this.get("type") || this.defaults().type,
    				"data": this.get("data") || this.defaults().data,
    				"xAxisCol": this.get("xAxisCol") || this.defaults().xAxisCol,
    				"yAxisCol": this.get("yAxisCol") || this.defaults().yAxisCol,
    				//"prefix": this.get("prefix") || this.defaults().prefix,
    				"selectionAxisCol": this.get("selectionAxisCol") || this.defaults().selectionAxisCol,
    				"hideXAxis": this.get("hideXAxis") || this.defaults().hideXAxis,
    				"hideYAxis": this.get("hideYAxis") || this.defaults().hideYAxis,
    				"marginLeft": this.get("marginLeft") || this.defaults().marginLeft,
    				"marginBottom": this.get("marginBottom") || this.defaults().marginBottom,
    				"xRotation": this.get("xRotation") || this.defaults().xRotation,
    				"xVisibility": this.get("xVisibility") || this.defaults().xVisibility,
    				"filters": this.get("filters") || this.defaults().filters
    			});
    	
    }

  });