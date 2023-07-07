/**
 * View that renders a GeoJSON map
 * 
 */
var GeoJSONViewer = Backbone.View.extend({

	//initial values here are static (shared between instances)
	
		tagName: "div",
		
		mapEl: null,
		
		zoomedIn: false,
		
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			
			var self = this;
			
			this.zoomedIn = false;
			
			//Load the SVG file and re-render when loaded
			d3.xml(this.model.get("file"), "image/svg+xml", function(error, xml) {
				  self.mapEl = xml.documentElement;
				  self.render();
				});
			
		},
		
		//Render app
	    render: function() {
		   
	    	d3.select(this.el)
    		.attr("class", "chart-container")
			.style("width", (w + 10) + "px");
	    		    	
	    	if (this.mapEl == null) return this;
	    	
	    	//get the reference to the SVG inside the template
	    	this.svgReference = d3.select(this.el).select("svg");
	    	
	    	var w = this.model.get("width");
	    	var h = this.model.get("height");
	    	
	    	this.svgReference
	    		.attr("width", w)
	    		.attr("height", h)
	    		.attr("preserveAspectRation", "xMidYMid slice")
	    		.attr("viewBox", "0 0 500 350")
	    		.attr("class", "YlGn");
	    	
	    	//copy drawing from the SVG file to the SVG DOM
	    	_.each(this.mapEl.childNodes, function(e)
	    	{
	    		if (e != null)
	    		{	    		
		    		if (e.nodeName == "g")
		    			this.svgReference.append(function() { return e; });
	    		}
	    		
	    	}, this);
	    	
	    	//this.svgReference.selectAll("g").forEach(function (g) { console.log(g[0].getBBox());});
	    	
	    	//register events
	    	this.svgReference.selectAll("path")
				.on("click", this.pathClicked);
		
			this.svgReference.selectAll("text")
				.on("click", this.pathClicked);
	    	
			//associated data with each location
			this.svgReference.selectAll("path")
				.datum( { yAxisCol: this.model.get("yAxisCol"), viewRef: this })
				.attr("title", function(d) { 
						return "<b>" + d.viewRef.fromAcronym(this.id) + "</b><br/>" + d.yAxisCol + ": ";
					});
			
		      return this;
	    },
	    
	    pathClicked: function (d) //data associated with the path object
	    {
	    	//the path's id contains the acronym
	    	// texts do not contain id, but the text is the acronym
	    	var acronym = (this.id || d3.select(this).text());
	    	//convert from acronym to actual name
	    	var name = d.viewRef.fromAcronym(acronym);
	    	
	    	//wishlist: goto URL filter/yAxisCol/name
	    	//console.log("filter/" + encodeURIComponent(d.yAxisCol) + "/" + encodeURIComponent(name));
	    	//currently: just fire event
	    	console.log(name);
	    	
	    	if (!d.viewRef.zoomedIn)
	    		d.viewRef.zoomIn(this);
	    	else
	    		d.viewRef.zoomOut();
	    },
	    
	    fromAcronym: function(acronym)
	    {	    	
	    	if (acronym == "AC") return "Acre";
	    	if (acronym == "AM") return "Amazonas";
	    	if (acronym == "RR") return "Roraima";
	    	if (acronym == "RO") return "Rond\u00F4nia";
	    	if (acronym == "AP") return "Amap\u00E1";
	    	if (acronym == "PA") return "Par\u00E1";
	    	if (acronym == "MA") return "Maranh\u00E3o";
	    	if (acronym == "TO") return "Tocantins";
	    	if (acronym == "PI") return "Piau\u00ED";
	    	if (acronym == "CE") return "Cear\u00E1";
	    	if (acronym == "RN") return "Rio Grande do Norte";
	    	if (acronym == "PB") return "Para\u00EDba";
	    	if (acronym == "PE") return "Pernambuco";
	    	if (acronym == "AL") return "Alagoas";
	    	if (acronym == "SE") return "Sergipe";
	    	if (acronym == "BA") return "Bahia";
	    	if (acronym == "MT") return "Mato Grosso";
	    	if (acronym == "GO") return "Goi\u00E1s";
	    	if (acronym == "DF") return "Distrito Federal";
	    	if (acronym == "MS") return "Mato Grosso do Sul";
	    	if (acronym == "MG") return "Minas Gerais";
	    	if (acronym == "ES") return "Esp\u00EDrito Santo";
	    	if (acronym == "RJ") return "Rio de Janeiro";
	    	if (acronym == "SP") return "S\u00E3o Paulo";
	    	if (acronym == "PR") return "Paran\u00E1";
	    	if (acronym == "SC") return "Santa Catarina";
	    	if (acronym == "RS") return "Rio Grande do Sul";
	    	
	    	return acronym;
	    },

	    /**
	     * Returns the acronym corresponding to the given state name
	     * @param name
	     */
	    toAcronym: function(name)
	    {	    	
	    	if (name == "Acre") return "AC";
	    	if (name == "Amazonas") return "AM";
	    	if (name == "Roraima") return "RR";
	    	if (name == "Rond\u00F4nia") return "RO";
	    	if (name == "Amap\u00E1") return "AP";
	    	if (name == "Par\u00E1") return "PA";
	    	if (name == "Maranh\u00E3o") return "MA";
	    	if (name == "Tocantins") return "TO";
	    	if (name == "Piau\u00ED") return "PI";
	    	if (name == "Cear\u00E1") return "CE";
	    	if (name == "Rio Grande do Norte") return "RN";
	    	if (name == "Para\u00EDba") return "PB";
	    	if (name == "Pernambuco") return "PE";
	    	if (name == "Alagoas") return "AL";
	    	if (name == "Sergipe") return "SE";
	    	if (name == "Bahia") return "BA";
	    	if (name == "Mato Grosso") return "MT";
	    	if (name == "Goi\u00E1s") return "GO";
	    	if (name == "Distrito Federal") return "DF";
	    	if (name == "Mato Grosso do Sul") return "MS";
	    	if (name == "Minas Gerais") return "MG";
	    	if (name == "Esp\u00EDrito Santo") return "ES";
	    	if (name == "Rio de Janeiro") return "RJ";
	    	if (name == "S\u00E3o Paulo") return "SP";
	    	if (name == "Paran\u00E1") return "PR";
	    	if (name == "Santa Catarina") return "SC";
	    	if (name == "Rio Grande do Sul") return "RS";
	    	
	    	return name;
	    },
	    
	    
	    zoomIn: function(path)
	    {
	    	var x, y, k;	    	
	    	
	    	if (!this.zoomedIn)
	    	{
	    		 // use the native SVG interface to get the bounding box
	            var bbox = path.getBBox();
	        	// return the center of the bounding box
	        	x = bbox.x + bbox.width/2 + 5; //push it a little bit to the left
	        	y = bbox.y + bbox.height/2;
	    	    
	        	var
	        		w = this.svgReference.attr("width"),
	        		h = this.svgReference.attr("height");
	        	var
	        	 xscale = w/bbox.width,
	        	 yscale = h/bbox.height,
	             pscale = Math.min(xscale, yscale) * 0.8; //zoom to 80%
	    	     
	    	    k = pscale;	
	    	    
	    	    if (path.id == "DF" || path.id == "SE")
	    	    {
	    	    	k = pscale * 0.8; //increase zoom for DF and SE, because they are too small
	    	    	x = x-4; //don't push that far to the left
	    	    }
	    	    
	    	   /* //add a transparent text box
	    	    this.svgReference
	    	    		.append("g")
	    	    		.append("rect")
	    	    		.attr("class", "whiteBox")
	    	    		.attr("x", 0) 
	    	    		.attr("y", this.svgHeight) //out from the view
	    	    		.attr("width", this.svgWidth) //width of the view
	    	    		.attr("height", 70)
	    	    		.attr("style", "fill:black;stroke-width:0;fill-opacity:0.1;")
	    	    		.transition()
	    			    .duration(850)
	    			    .attr("transform", "translate(0, -70)"); //bring into the view
	    	    
	    	    //add a large 'name' text label
	    	    this.svgReference
	    	    		.append("g")
	    	    		.attr("class", "mapCentralLabel")
	    	    		.append("text")
	    			    .attr("x", 10) 
	    			    .attr("y", this.svgHeight + 20) //initially out of screen
	    			    .attr("dy", "7px")
	    			    .text(locationName)
	    			    //.attr("style", "stroke: #777777; stroke-width: 0.5")
	    			    .transition()
	    			    .duration(850)
	    			    .attr("transform", "translate(0,-60)"); //bring into the view
*/	    	    
	    	    var valueStr;
	    	    
	    	   /* if (this.formatter != null) valueStr = this.formatter(path.data()[0].value);
	    	    else
	    	    	valueStr = this.prefix +
	        			$panelist.prettyNumber(path.data()[0].value, this.decimals);*/
	    	    
	    	  //add a smaller 'value' text label with the metric value
	    	   /* this.svgReference
	    	    		.append("g")
	    	    		.attr("class", "mapCentralSubtitle")
	    	    		.append("text")
	    			    .attr("x", 15) 
	    			    .attr("y", this.svgHeight + 40) //initially out of screen
	    			    .attr("dy", "7px")
	    			    .text(valueStr
	    			    		+ ' ' + (this.properties.unity || 'neste Estado'))
	    			    .transition()
	    			    .duration(850)
	    			    .attr("transform", "translate(0,-60)"); //bring into the view
*/	    	    
	    	    this.zoomedIn = true;
	    	    
	    	    
	    	    var paths = this.svgReference.selectAll("path");
	    		//make the non-selected areas disappear
	    		paths
	    	    	.classed("inactive", function(d) { 
	    											return this !== path;
	    											});
	    		
	    		this.svgReference.selectAll(".legend")
	    			.classed("inactive", true);
	    		
	    		
	    		paths
	    			.transition()
	    		    .duration(750)
	    		    .attr("transform", "translate(" + w/2 + "," + h/2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")");
	    	  	
	    		//move the labels out from view
	    		 this.svgReference
	    		 			.select("#panelist-map-labels")
	    		 			.style("visibility", "hidden");
	    	    
	    	    //========== define filter
	    	    alertify.log("Filtrando");
	    	}
	    },
	    
	    zoomOut: function()
	    {
	    	if (this.zoomedIn)
	    	{		
	    	    this.zoomedIn = false;
	    	    
	    	  /*//remove the previous white box
	    		this.svgReference.selectAll(".whiteBox")
	    		   			.transition()
	    				    .duration(650)
	    				    .attr("transform", "translate(0,"+ this.svgHeight +")")
	    				    .remove();
	    	    	    
	    	    //remove the previous 'name' label
	    	   this.svgReference.selectAll(".mapCentralLabel")
	    	   			.transition()
	    			    .duration(650)
	    			    .attr("transform", "translate(0,"+ (this.svgHeight+20) +")")
	    			    .remove();
	    	   
	    	 //remove the previous 'value' subtitle
	    	   this.svgReference.selectAll(".mapCentralSubtitle")
	    	   			.transition()
	    			    .duration(650)
	    			    .attr("transform", "translate(0,"+ (this.svgHeight+40) +")")
	    			    .remove();*/
	    	   
	    	   var paths = this.svgReference.selectAll("path");
	    		//remove the .inactive class from the paths
	    		paths
	    	    	.classed("inactive", false);
	    		
	    		this.svgReference.selectAll(".legend")
	    			.classed("inactive", false);
	    		
	    		paths
	    			.transition()
	    		    .duration(750)
	    		    .attr("transform", "scale(1)");
	    	  	
	    		 var labelsArea = this.svgReference.select("#panelist-map-labels");
	    		 //move the labels back to the view
	    		  labelsArea.transition().delay(750).style("visibility", "visible");
	    		  
	    	
	    		  //========== define filter
	    		    alertify.log("Removendo filtro");
	    		 
	    	}
	    }
  });