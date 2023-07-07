/**
 * The navigator layout configures the current
 * layout of the navigator view. It defines
 * the menu items and the windows that are
 * open at the time.
 * The navigator view renders everything that
 * is necessary to make the workspace match
 * the navigator layout given.
 * 
 * 
 */
var Layout  = Backbone.Model.extend({

	// Default attributes
    defaults: function() {
      return {
        name: null,
        views: null,
        menu:LayoutFactory.defaultMenu
      };
    },
	    
    initialize: function() {
    	this.set({
			"name": this.get("name") || this.defaults().name,
			"views": this.get("views") || this.defaults().views,
			"menu": this.get("menu") || this.defaults().menu
		});
    	
    	if (this.get("name") != null)
    	{
	    	var self = this;
	    	var name = this.get("name");
	    	
	        //load layout description file and create layout	
	    	var file = "layouts/" + name + ".layout";
	    	
	    	self.clear();
			
			d3.json(file, function(error, json) {
				  
				if (error)
				{
					self.set({"name": name, "views": [ 
					                     new ErrorView({ 
					                    	 model: new Error({	
					                    		 "error": error.status + " (" + error.statusText + ")", 
					                    		 "details": "Erro ao tentar carregar o painel. Por favor, tente outra opção enquanto solucionamos o problema."
					                    	 		})
					                     })], 
					                     "menu": LayoutFactory.defaultMenu 
					           });
					return ;//console.warn(error);
				} 
				  //array of views
				  var viewData = json;
				  
				  var views = new Array();
				  
				  viewData.forEach(function (v) {
					 
					  //which type of view is it?
					  if (v.type != null)
					  {
						  if (v.type == "IndicatorGraphicView")
						  {
							  var indicator = IndicatorFactory.build(v.data);
							  
							  views.push(new IndicatorGraphicView({ model: indicator}));
						  }
						  else
						  if (v.type == "CatalogView")
						  {
							  var catalog = new Catalog(v.data);
							  views.push(new CatalogView({ model: catalog }));
						  }
						  else
						  if (v.type == "LINE_BREAK")
						  {
							  views.push(0);
						  }
					  }
					  
				  });
				  
				  //Update layout model
				  self.set({"name": name, "views": views, "menu": LayoutFactory.defaultMenu });
				  				  
				  
			});
    	}
    }

  });