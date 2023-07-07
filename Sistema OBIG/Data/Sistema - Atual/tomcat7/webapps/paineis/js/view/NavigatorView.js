

// The Application
 // ---------------
var NavigatorView = Backbone.View.extend({
	
		 // Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: $("#app"),
					
		navigatorTemplate: null,
		menuTemplate: null,
		
		layout: null,
		
		selection: null,
		
		//if the user already knows that he/she has to click in a map to filter
		introduced: false,
		
		// Delegated events
		events: {
		  
		},
		
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function(layout) {
				this.stopListening();
								
				this.layout = layout;
				
				this.navigatorTemplate = _.template($('#navigator-template').html());
				this.menuTemplate = _.template($('#mainMenu-template').html());
			
				this.render();	
				this.listenTo(this.layout, 'change', this.render);
				
		},
		
		//Render app
	    render: function() {
	    	   		
	    	
	    		//main layout
	    		this.$el.html(this.navigatorTemplate()); 
				
				$('#app-menu').html(this.menuTemplate({menu: this.layout.get("menu")}));
				
				var views = this.layout.get("views");
				
				if (views)
					views.forEach(function (v) {
								if (v)
									$('#app-workspace').append(v.render().el);
								else
									$('#app-workspace').append('<div style="clear:both;"></div>');
							});
				else
					$('#app-workspace').append('<p>Carregando... <img src="img/loading-small-blue.gif"/></p>');
				
				//put at the end to ensure views are 'inside' the #app-workspace element
				$('#app-workspace').append('<div style="clear:both;"></div>');
				
				//pass out the selected element
				if (this.selection != null)
				{				
					Global.eventBus.trigger("view:selection", this.selection);
				}
				
						
				if (!this.introduced)
				{
					alertify.log("<img src='img/icon/question_31x31.png' style='float:right;'/><h2 class='alertify-header'>Navegação</h2><div class='alertify-content'>Clique sobre qualquer estado em um mapa ou tabela para apresentar os dados somente daquele estado. Clique novamente para voltar aos dados do Brasil.</div>" +

							"<br/><div class='alertify-footer'>Clique nesta caixa para fechá-la</div>", "", 0);
					this.introduced = true;
				}
				 
				/*if (views)
				{	
					//----- Remove UI blocker
					$("#blocker").remove();
					$(".appContainer").css("overflow", "auto");
				}*/
	    },
		
		
		
		/*
		 * Does the name of the current layout displayed
		 * matches the given layout name?
		 */
		isInLayout: function(name)
		{
			return (this.layout.name == name);
		},
		
		getLayoutName: function()
		{
			return this.layout.name;
		},
		
		/*
		 * Ensures that, after the method call,
		 *  we are at the initial view
		 * of the given layout
		 *		
	     * If an element is selected in the layout, selection contains its name
		 */
		transformLayout: function(name, selection)
		{
			this.selection = selection;
			//set layout
			if (!this.isInLayout(name))		
			{
				var views = this.layout.get("views");
				
				if (views)
					views.forEach(function (v) {
								if (v)
									v.remove(); //remove the view from the DOM
							});
				
				this.layout = null;
				
				//removes all view callbacks bounded to the event Bus
				Global.eventBus.off();
				
				//re-construct the navigator
				this.initialize(new Layout({"name": name}));
				

				if (name=="catalog")
				{ //the instruction box should not be displayed in the catalog page
					d3.select("#alertify-logs").transition(500).style("opacity", "0");
				}
				else
					d3.select("#alertify-logs").transition(500).style("opacity", "1");
			}

			
		},
		
		navigate: function(layout, selection)
		{
			//if layout is null, keep current layout
			var newLayout = layout != null ? layout : this.layout.get("name");			
			//if selection is given, go to the selection
			var selectionPath = selection ? "/" + encodeURIComponent(selection) : "";
			
			//only reload the page if the layout changes
			var layoutChanges = newLayout != this.layout.get("name");
			
			Global.router.navigate("/layout/" + newLayout + selectionPath,
						{trigger: layoutChanges, replace: true});
			
			//if we are not reloading the page but we have a selection, we must trigger the selection event
			if (!layoutChanges)
				Global.eventBus.trigger("view:selection", selection);
			
			
		}

  });