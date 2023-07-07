/**
 * 
 */
var TableData  = Backbone.Model.extend({

	
	bounds: null, //object: { "colName": { min: ..., max: ...} }
	
    // Default attributes
    defaults: function() {
      return {       
        data: [],
        categories: [],
        numRows: 0,
        numCols: 0,
        categoryCol: null,
        metaData: [] //array of { name: ..., caption: ..., type: .., format: ... } objects
      };
    },
    
    initialize: function() {
    	
    },
    
    /**
     * 
     * @param dataArray format: [ [ col1, col2 ], ... ]
     * @param categoryColName
     * @param metaData
     */
    load: function(dataArray, categoryColName, metaData) {
    	
    	this.set({"data": dataArray});
    }

});