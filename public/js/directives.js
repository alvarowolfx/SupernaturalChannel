
angular.module('supernaturalDirectives',[])
	.directive('bargraph', function(){

		return {
	    	restrict: 'E',
	    	scope: {
	      		val: '='
	    	},
	    	link: function (scope, element, attrs) {
	    
	      
		      	var vis = d3.select(element[0])
		      		.append("svg")
		      		.attr("style", 'height:500px;width:90%');	      		
					       
	          
	      		scope.$watch('val', function (newVal, oldVal) {
	      			console.log('Value changed on bargraph');        		
	        		vis.selectAll('*').remove();        
	        
		        	if (!newVal) {
		          		return;
		        	}
		            console.log(newVal);
		    		nv.addGraph(function() {
					    var chart = nv.models.discreteBarChart()
					        .x(function(d) { return d['name']  })
					        .y(function(d) { return d['count'] })
					        .staggerLabels(true)
					        .tooltips(false)
					        .showValues(true)
					  			  	
					   	vis.datum(newVal)
					       .transition().duration(2000)
					       .call(chart);
					 				 	
					   	nv.utils.windowResize(chart.update);
				 
				   	   	return chart;
			 		});

	      		});
	    	}
	  	}
	})
	.directive('directedgraph',function(){


		return {

			restrict : 'E',
			scope : {
				value : '='
			},
			link : function(scope,element,attrs){
								      		

      			scope.$watch('value', function (newVal, oldVal) {
	      			console.log('Value changed on directedGraph');        		
	        		//svg.selectAll('*').remove();        
	        		console.log(newVal);
		        	if (!newVal) {
		          		return;
		        	}
		        	
		            // Declare a spot for the graph
					var svg = d3.select(element[0]).append("svg")
						.attr("style", 'height:89%;width:90%');
									 	
					// Create the graph
					var force = d3.layout.force()
						.gravity(.2)
						.distance(250)
						.charge(-1000)
						.on('tick', tick)
						.size([900, 500]);
				 	
				 	force.nodes(d3.values(nodes))
     					 .links(d3.values(links))
     					 .start();

     				var nodes = [];
		        	var links = [];
		        	// Populate the nodes
					for (var i in newVal['nodes'])
					{		
						
						nodes.push(newVal['nodes'][i]['id'], 
									{"name": newVal['nodes'][i]['name'], 
									 "data": newVal['nodes'][i]['count']});
						
					}
					// Populate the links
					for (var i in newVal['links'])
					{	
						links.push(newVal['links'][i]['id'],
									{"source": nodes[newVal['links'][i]['source']], 
									 "target": nodes[newVal['links'][i]['target']], 
									 "data":nodes[newVal['links'][i]['type']]});				
					}
		            console.log(nodes);
		            console.log(links);

				 	var link = svg.selectAll(".link").data(force.links());
					 
					// Update the new links
					link.enter().append("line");
				 
					// Remove the old links
					link.exit().remove();
				 
					// Draw the nodes
					var node = svg.selectAll(".node").data(force.nodes());
				 
					// Update the new nodes 
					node.enter().append("svg:g");
				 
					// Remove the old nodes
					node.exit().remove();		

					// Create the tick function which animates the graph
					function tick()
					{
						link.attr("x1", function(d) { return d.source.x; })
						    .attr("y1", function(d) { return d.source.y; })
						    .attr("x2", function(d) { return d.target.x; })
						    .attr("y2", function(d) { return d.target.y; });
						node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
					}

	      		});


			}

		}

	});