/**
 * 
 * Constructs the indicator model from loaded JSON data.
 * This is mostly the process of instantiating each chart model
 * based on the chart type and then instantiating the Indicator object 
 */
var ChartUtils = {
		createChart: function(c) {
			var type = c.type;
			
			if (type != null)
			{
				var cData = c.data;
				
				if (type == "People")
				{
					return new People(cData);
				}
				else
				if (type == "PercentageArc")
				{
					return new PercentageArc(cData);						
				}
				else
				if (type == "Pie")
				{
					return new Pie(cData);
				}
				else
				if (type == "Plot2D")
				{
					return new Plot2D(cData);
				}
				else
				if (type == "SVGMap")
				{
					return new SVGMap(cData);
				}
				else
				if (type == "HTMLSnippet")
				{
					return new HTMLSnippet(cData);
				}
				else
				if (type == "Table")
				{
					return new Table(cData);
				}
				else
				if (type == "RowValue")
				{
					return new RowValue(cData);
				}
				else
				if (type == "Comparator")
				{
					return new Comparator(cData);
				}
				else
				if (type == "Datatable")
				{
					return new Datatable(cData);
				}
				else
				if (type == "LINE_BREAK")
				{
					return LINE_BREAK;
				}
				else
					if (type == "Donut")
					{
						return LINE_BREAK;
					}
				else
					return null;
			}
		}
};

var IndicatorFactory  = {
		
		
		build: function(data) {
			
			var chartData = data.charts;
			var chartModels = new Array();
			
			//if the indicator has no charts, just create the object from JSON
			if (chartData == null || chartData.length == 0)
				return new Indicator(data);
			
			chartData.forEach(function (c) {
				
				var chart = ChartUtils.createChart(c);
				if (chart != null)
					chartModels.push(chart);
				
			});
			
			//exchange chart descriptions to actual chart objects
			data.charts = chartModels;
			
			return new Indicator(data);
		}
};