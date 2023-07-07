/**
 * 
 * Creates a visualization based on the chart model type
 */
var ChartViewFactory  = {
		
		
		getView: function(chartModel) {
			
			//code for a line break
			if (!chartModel) return LINE_BREAK;
			
			if ("PercentageArc" == chartModel.chartType)
			{
				return new PercentageArcView({model: chartModel});
			}
			else
			if ("SVGMap" == chartModel.chartType)
			{
				return new SVGMapView({model: chartModel});
			}
			else
			if ("Plot2D" == chartModel.chartType)
			{
				return new Plot2DView({model: chartModel});
			}
			else
			if ("Pie" == chartModel.chartType)
			{
				return new PieView({model: chartModel});
			}
			else
			if ("People" == chartModel.chartType)
			{
				return new PeopleView({model: chartModel});
			}
			else
			if ("HTMLSnippet" == chartModel.chartType)
			{
				return new HTMLSnippetView({model: chartModel});
			}
			else
			if ("Table" == chartModel.chartType)
			{
				return new TableView({model: chartModel});
			}
			else
			if ("RowValue" == chartModel.chartType)
			{
				return new RowValueView({model: chartModel});
			}
			else
			if ("Comparator" == chartModel.chartType)
			{
				return new ComparatorView({model: chartModel});
			}
			else
			if ("Datatable" == chartModel.chartType)
			{
				return new DatatableView({model: chartModel});
			}
			else
				return null;
		}
};