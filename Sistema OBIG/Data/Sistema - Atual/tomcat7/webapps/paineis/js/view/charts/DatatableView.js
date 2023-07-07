/**
 * Generic View that displays matrix data of a Datatable model using Datatables plugin
 * 
 */
var DatatableView = Backbone.View.extend({

		//initial values here are static (shared between instances)
	
		tagName: "div",
		template: null,
			
		selected: null,
		
		// Delegated events
		events: {
			
		},
		
		//Initialization
		// (find DOM elements, set listeners, and initialize objects)
		initialize: function() {
			
			this.template = _.template($('#datatable-chart-template').html());
			this.listenTo(this.model, 'change', this.render);
			
			Global.eventBus.on("view:selection", this.select, this);
			
			/*var self = this;
			//Load the SVG file and re-render when loaded
			d3.xml(this.model.get("icon"), "image/svg+xml", function(error, xml) {
				  //get the root SVG									
				  self.iconNode = xml.documentElement;
				  self.render();
				});*/
		},
		
		//Render app
	    render: function() {
		      
	    	//get model attributes
	    	var w = this.model.get("width");
	    	
	    	//set size
	    	d3.select(this.el)
		    	.attr("class", "chart-container")
		    	.style("width", w + "px");
		    	    	
	      	
	    	this.model.updateRows();
	    	
	    	
	    	//render container template
	    	this.$el.html(this.template(this.model.toJSON()));
	    		

    		
	    	
	    	var ref = this;
	    		    	
	    	/*setTimeout(function() { 
	    		
	    		//if it is already initialized, return
	    		if ( $.fn.dataTable.isDataTable( '#'+ref.model.get("id") ) ) return ref;
	    	*/	
	    		//initialize DataTable
		    	$('#'+ref.model.get("id")).dataTable({
		    		"deferRender": true,
		    		
		    		"oLanguage": {
		    			"oPaginate": {
		    		        "sFirst": "Primeira",
		    		        "sLast": "\u00DAltima",
		    		        "sNext": "Pr\u00F3xima \u25B6",
		    		        "sPrevious": "\u25C0 Anterior",
		    		      },
		    		      "sEmptyTable": "Nenhum dado dispon\u00EDvel",
		    		      "sInfo": "<i>Exibindo _START_ a _END_ de _TOTAL_ registros</i>",
		    		      "sInfoEmpty": "Nenhum registro",
		    		      "sInfoFiltered": " (de um total de _MAX_ registros)",
		    		      "sInfoThousands": ".",
		    		      "sLengthMenu": "Exibir _MENU_ registros",
		    		      "sLoadingRecords": "Carregando dados...",
		    		      "sSearch": "Filtrar:",
		    		      "sZeroRecords": "Nenhum registro"
		    		    },
	    		    "aaSorting": (ref.model.get("sorting") || [[0, "asc"]]),
	    		    "columns": ref.model.get("colsIncluded"), //attribute mixes our properties and dataTables' ones
	    		    "sScrollY": (ref.model.get("height")-120) + "px",
	    		    "bPaginate": false,
	    		    //"sPaginationType": "full_members"
	    		    
	                "createdRow": function( row, data, dataIndex ) {
	
	
	                	if (ref.model.get("rowHasLinks"))
	    		    	{
	                		$(row).click(function () {
		                    	
		                    	var id = data[ref.model.get("rowIdAttributeIndex")];
		                        
		                        var link = ref.model.get("rowLinkBase") + "?" +
		                        				ref.model.get("rowLinkQuery") + "="
		                        				+ id;
		                        				
		                        window.open(link,'_blank');
		                    });
		                    
	    		    	}
	                  }
		    	});
	    	
	    	/*}, 100);
	    	*/
	    	
		      return this;
	    },
	    
	    
	    select: function(selection) {
	    	
	    	var oTable = $('#' + this.model.get("id")).dataTable();
	    	
	    	var selectionColIndex = this.model.get("selectionFilterCol");
	    	if (selectionColIndex == null) selectionColIndex = 0;
	    	
	    	if (selection)
	    	{	
		    	//--- Brasil map workaround, from "Estado" to "UF" -----------
		    	selection = this.toAcronym(selection);
		    	//------------------------------------------------------------
		    }
	    	else selection = '';
	    	
	    	oTable.fnFilter(selection, selectionColIndex);
	    	
	    },
	    
	    
	    toAcronym: function (name) {
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
	    	//otherwise
	    	return name;
	    }
	    
  });