angular.module("d3compilation")
.controller("barCtrl", function($scope, mainServ) {
  $scope.arr = mainServ.arr;
//bar chart

  var height    = 276,
      width     = 276,
      barwidth  = 20;

  var color = d3.scale.category10();

  var yScale = d3.scale
      .ordinal()
      .domain(d3.range(0,$scope.arr.length))
      .rangeBands([0,height]);

  var svg = d3.select(".bars")
      .append("svg") //creates platform for pie chart
      .attr("width", width) //size of pie chart svg platform
      .attr("height", height) //size of pie chart svg platform
      .append("g");

  svg.selectAll('rect')
      .data($scope.arr)
      .enter()
      .append('rect')
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", function(d, i){
        return yScale(i);
      })
      .attr("height", yScale.rangeBand())

      .attr('width', function(d){
          return 0;
      })
      .style("fill", function(d, i) {
          return color(i % 20);
      });

  var updatebars = function(){

      var max = 0;
      for (var i = 0; i < $scope.arr.length; i++) {
          $scope.arr[i].number = parseInt($scope.arr[i].number);
          if($scope.arr[i].number > max){
            max = $scope.arr[i].number;
          }
      }

      var xScale = d3.scale
          .linear()
          .domain([0,max])
          .range([0,width]);

      d3.select('.bars svg g')
          .selectAll('.bar')
          .data($scope.arr)
          .transition()
          .duration('500')
          .style("fill", function(d, i) {
              return color(i % 20);
          })
          .style("width", function(d){
            if (d.number === 0){
              return 0;
            }
            return xScale(d.number);
          });
  };
  updatebars();

  setInterval(function(){
    updatebars();
  }, 1000);

});
