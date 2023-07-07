
/**
 * 
 */
var DataUtils = {
		
		sampleColors:[
                      '#2f7ed8', 
                      '#0d233a', 
                      '#8bbc21', 
                      '#910000', 
                      '#1aadce', 
                      '#492970',
                      '#f28f43', 
                      '#77a1e5', 
                      '#c42525', 
                      '#a6c96a'
                   ],
        
        numericSuffixes: [' mil', ' milhões'], 
		
		isIncluded: function(row, filters)
		{
			//if there is no filter, all rows are included
			if (filters == null) return true;
			
			var included = filters.included;
			var excluded = filters.excluded;
			var selected = filters.selected;
			
			//by default 
			var result = true;
			
			//OR semantics, exclusion priority over inclusion
			if (excluded)
				excluded.forEach(function (f) {
					
					var column = f.column;
					var value = f.value;
					
					if (row[column] == value)
						result = false;
				}
				);
			
			//Check selection filter (current selection in the view)
			// it will overwrite the 'included' filter when applicable
			var overwriten = new Object;
			if (selected)
			{
				selected.forEach(function (f) {
					var column = f.column;
					var value = f.value;
					
					overwriten[column] = value;
				}) ;
			}
			
			//AND semantics: all columns matching the inclusion
			if (included)
			{
				var allMatch = true;
				included.forEach(function (f) {
							
							var column = f.column;
							var value = f.value;
							
							if (overwriten[column]) //the column filter is overwritten by the selection
								allMatch = allMatch && (row[column] == overwriten[column]);
							else
								allMatch = allMatch && (row[column] == value);
							//if (row[column] == value)
							//	result = true; //include this row
						}
					);
				result = allMatch && result;
			}
			else
				if (selected) //in case included does not exist, use selected as 'included'
				{
					selected.forEach(function (f) {
						var column = f.column;						
						result = result && (row[column] == f.value);
					}) ;
				}
			
			//include the row by default, or if included and not excluded
			return result;
		},
		
		
		createQuantizer: function(min, max, numClasses)
		{
			return d3.scale.quantile().domain([min, max]).range(d3.range(numClasses));
		}
		,
		/**
		 * dataTable is an array of rows, which are arrays of columns
		 *//*
		createQuantizer: function(dataTable, columnIndex, numClasses, rowFilter)
		{
			var vector = [];
			
			dataTable.forEach(function (row, i) {
				if (rowFilter(row, i))
				{
					vector.push(row[columnIndex]);
				}
			});
			
			var min = d3.min(vector);
			var max = d3.max(vector);
			
			return DataUtils.createQuantizer(min, max, numClasses);
		},*/
		
		getFilteredVector: function(data, column, filters, numeric)
		{
			var filteredVector = new Array();
			
			data.forEach(function (row) {
				if (DataUtils.isIncluded(row, filters))
				{
					var n = row[column];
					if (numeric) n = +n;
					
					filteredVector.push(n);
				}
			});
			
			return filteredVector;
		},
		
		createColumnLinear: function(data, column, filters, range)
		{
			var filteredVector = DataUtils.getFilteredVector(data, column, filters, true);
			
			if (!range) range = [0, 1];
			
			return d3.scale.linear()
				.domain([
				         d3.min(filteredVector), 
				         d3.max(filteredVector)
				  ])
				.range(range);
		},
		
		createColorLinear: function(min, max, fromColor, toColor)
		{
			return d3.scale.linear().domain([min, max]).range([fromColor, toColor]);
		},
		
		createColorQuantizer: function(min, max, fromColor, toColor, numClasses)
		{
			//default quantizer with 10 categories
			var quantizer = DataUtils.createQuantizer(min, max, numClasses);
			var linear = DataUtils.createColorLinear(0, numClasses-1, fromColor, toColor);
			return function(value)
					{				
						var quantizedValue = quantizer(value);
												
						return linear(quantizedValue);
					};
		},
		
		prettyNumber: function(number, decimals)
		{
			if (number >= 1000000)
				return (number/1000000).toFixed(decimals).replace(".", ",") + ' ' + this.numericSuffixes[1];
			if (number >= 1000)
				return (number/1000).toFixed(decimals).replace(".", ",") + ' ' + this.numericSuffixes[0];
			
			return number.toFixed(decimals).replace(".", ",");
				
		},
		
		jsonToArray: function(field, jsonData)
		{
			var a = new Array();
			jsonData.forEach(function(row, i)
					{
						a[i] = row[field];
					});
			
			return a;
		}
};