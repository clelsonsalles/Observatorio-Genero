/**
 * 
 */
var SVGMap  = Backbone.Model.extend({

	chartType: "SVGMap",
	
    // Default attributes
    defaults: function() {
      return {
        file: 'svg/brasil_uf_map.svg',
        width: 500,
        height: 350,
        title: 'Map',
        minColor: 'gray',
        maxColor: 'navy',
        colorSteps: 5,
        colorize: 'auto', //auto or fixed
        colorizeModel: null, //if fixed, an object { intervals: [ [>=X, <Y] ..], colors: [], labels: []}
        selectionColor: "#FF9966",
        xAxisCol: "",
        yAxisCol: "",
		totalAxisCol: null, //if not null, the map will compute percentages of y/total
		decimalPoints: 0,
        info: "...",
        selected: null //object that is currently selected in the map
      };
    },
    
    initialize: function() {
    	this.set({"file": this.get("file") || this.defaults().file,
		    		"width": this.get("width") || this.defaults().width,
					"height": this.get("height") || this.defaults().height,
					"title": this.get("title") || this.defaults().title,
					"colorSteps": this.get("colorSteps") || this.defaults().colorSteps,
					"minColor": this.get("minColor") || this.defaults().minColor,
					"maxColor": this.get("maxColor") || this.defaults().maxColor,
					"colorize": this.get("colorize") || this.defaults().colorize,
					"colorizeModel": this.get("colorizeModel") || this.defaults().colorizeModel,
					"selectionColor": this.get("selectionColor") || this.defaults().selectionColor,
					"xAxisCol": this.get("xAxisCol") || this.defaults().xAxisCol,
					"yAxisCol": this.get("yAxisCol") || this.defaults().yAxisCol,
					"info": this.get("info") || this.defaults().info,
					"selected": this.get("selected") || this.defaults().selected,
					"totalAxisCol": this.get("totalAxisCol") || this.defaults().totalAxisCol,
					"decimalPoints": this.get("decimalPoints") || this.defaults().decimalPoints
					});
    	
    }

  });