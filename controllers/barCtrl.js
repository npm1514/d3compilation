angular.module("d3compilation")
.controller("barCtrl", function($scope, mainServ) {
  $scope.arr = mainServ.arr;
//bar chart
  d3.select('.bars')
      .selectAll('div')
      .data($scope.arr)
      .enter()
      .append('div')
      .attr("class", "bar")
      .style("height", "5%")
      .style('width', function(d){
          return 0;
      })
      .style("background-color", function(d){
          return d3.hsl(d.color.h,d.color.s,d.color.l)
      });

  var updatebars = function(){
    var max = 0;
      for (var i = 0; i < $scope.arr.length; i++) {
          $scope.arr[i].number = parseInt($scope.arr[i].number);
          if($scope.arr[i].number > max){
            max = $scope.arr[i].number;
          }
      }
      d3.select('.bars')
          .selectAll('.bar')
          .data($scope.arr)
          .transition()
          .duration('500')
          .style("width", function(d){
            if (d.number === 0){
              return 0;
            }
              return (d.number/max)*276 + "px";
          });
  };
  updatebars();

  setInterval(function(){
    updatebars();
  }, 1000);

});
