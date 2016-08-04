angular.module("d3compilation")
.controller("circleCtrl", function($scope, mainServ) {
  $scope.arr = mainServ.arr;

  var svg = d3.select(".circles")
      .append("svg") //creates platform for pie chart
      .attr("width", 276) //size of pie chart svg platform
      .attr("height", 276) //size of pie chart svg platform
      .append("g");

  var color = d3.scale.category10();

  svg.selectAll('g')
      .data($scope.arr)
      .enter()
      .append('circle')
      .attr("class", "circle")
      .attr("cx", function(d){
        return Math.random()*236 + 20;
      })
      .attr("cy", function(d){
        return Math.random()*236 + 20;
      })
      .attr("r", function(d){
        return 0;
      })
      .style("fill", function(d, i) {
          return color(i % 20);
      });

  var updatecircles = function(){
      var max = 0;
      for (var i = 0; i < $scope.arr.length; i++) {
          $scope.arr[i].number = parseInt($scope.arr[i].number);
          if($scope.arr[i].number > max){
            max = $scope.arr[i].number;
          }
      }
      d3.selectAll('circle')
          .data($scope.arr)
          .transition()
          .duration('500')
          .attr("r", function(d){
            return d.number/max*276/8;
          });
  };
  updatecircles();

  setInterval(function(){
    updatecircles();
  }, 1000);



});
