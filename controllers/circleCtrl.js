angular.module("d3compilation")
.controller("circleCtrl", function($scope, mainServ) {
  $scope.arr = mainServ.arr;

  var width  = 276,
      height = 276;

  var svg = d3.select(".circles")
      .append("svg") //creates platform for pie chart
      .attr("width", width) //size of pie chart svg platform
      .attr("height", height) //size of pie chart svg platform
      .append("g");

  var color = d3.scale.category10();


  svg.selectAll('g')
      .data($scope.arr.slice(1))
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
      })
      .style("transform", function(d){
        return "translateX(0px)translateY(0px)";
      });

  d3.select(".circles svg")
      .on('click', function(){
        d3.select(".circles")
            .selectAll('.circle')
            .data($scope.arr.slice(1))
            .transition()
            .duration(500)
            .style("transform", function(d){
              var sign = ["-", "+"];
              var px = Math.round(Math.random());
              var py = Math.round(Math.random());
              var x = sign[px] + Math.random()*width/2;
              var y = sign[py] + Math.random()*height/3;
              return "translateX(" + x + "px)translateY(" + y + "px)";
            });
      });

  var updatecircles = function(){
      d3.selectAll('circle')
          .data($scope.arr.slice(1))
          .transition()
          .duration('500')
          .attr("r", function(d){
            return d/d3.max($scope.arr.slice(1))*276/6 + 4;
          });
  };
  updatecircles();

  setInterval(function(){
    updatecircles();
  }, 1000);

});
