/**
 * 
 */
var Datatable  = Backbone.Model.extend({

	chartType: "Datatable",
	
    // Default attributes
    defaults: function() {
      return {
        width: 315,
        height: 200,
        title: 'Table',
        id: 't1',
        colsIncluded: [] // { name:, label: } pairs, which can include any "columnDef" attribute of Datatables, such as width
      };
    },
    
    initialize: function() {
    	
    	this.set({
    				"width": this.get("width") || this.defaults().width,
    				"title": this.get("title") || this.defaults().title,
    				"id": this.get("id") || this.defaults().id,
    				"height": this.get("height") || this.defaults().height,
    				"colsIncluded": this.get("colsIncluded") || this.defaults().colsIncluded
    			});
    	
    },
    
    updateRows: function() {
    	
    	if (this.has("data"))
    	{
    		//search row
    		var dataArray = this.get("data");
    		
    		var colsIncluded = this.get("colsIncluded");
    		
    		
    		var rows = new Array();
    		
    		for (var ri = 0; ri < dataArray.length; ri++)
    		{
    			var row = dataArray[ri];
    			
    			if (DataUtils.isIncluded(row, this.get("filters")))
    			{   
	    			var newRow = new Array();
	    			
	    			for (var ci = 0; ci < colsIncluded.length; ci++)
	    				newRow.push(row[colsIncluded[ci].name]);
	    			
	    			rows.push(newRow);
	    			
    			}
    		}
    		
    		this.set("rows", rows);	
    	}
    	else
    		this.set("rows", []);
    	
    	//this.trigger("change");
    }

  });