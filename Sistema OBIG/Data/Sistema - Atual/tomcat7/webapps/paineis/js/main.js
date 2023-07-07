
/***********************************
*
*
* Cesar A. L. Oliveira
*  cesar.lins@gmail.com
*
***********************************/


var Global = {
	session: null,
	navigator: null, //new NavigatorView()
	router: null, //new PageFlow()
	locale_PT_BR: null,
	locale_EN: null,
	eventBus: new Object()
};

var LINE_BREAK = 0;

var PageFlow = Backbone.Router.extend({

	  routes: {
	    "layout/:name(/:selection)":        				"setLayout",
	    "page/:file":									"gotoPage",
	    "" :											"openHomeLayout"
	  },

	  	  
	  /*
	   * 
	   */
	  setLayout: function(name, selection) 
	  {
		  
		  Global.navigator.transformLayout(name, selection);
		  
		  
	  },
	  
	  openHomeLayout: function()
	  {
		  //this.setLayout("home", null);
		  this.navigate(Settings.HOME_URL, {trigger: true, replace: true});
	  },
	  
	  gotoPage: function(file)
	  {
		  window.location = "./" + file;
	  }

});



$(function(){
	
		
	//create the event bus
	_.extend(Global.eventBus, Backbone.Events);
	
	//create the navigator view
	Global.navigator = new NavigatorView(new Layout());
	//create the router
	Global.router = new PageFlow();
	  	 
  		
  	 //Activate the route engine
  	 Backbone.history.start();
  	 

});