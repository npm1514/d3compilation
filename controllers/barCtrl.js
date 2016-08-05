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
      .append("svg")
      .attr("width", width)
      .attr("height", height)
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
      })
      .style("transform", function(d){
        return "translateX(0px)translateY(0px)rotateZ(0deg)";
      });

  d3.select(".bars svg")
      .on('click', function(){
        d3.select(".bars")
            .selectAll('.bar')
            .data($scope.arr.slice(1))
            .transition()
            .duration(500)
            .style("transform", function(d){
              var sign = ["-", "+"];
              var px = Math.round(Math.random());
              var py = Math.round(Math.random());
              var pz = Math.round(Math.random());
              var x = sign[px] + Math.random()*width/2;
              var y = sign[py] + Math.random()*height/3;
              var z = sign[pz] + Math.random()*45;
              return "translateX(" + x + "px)translateY(" + y + "px)rotateZ(" + z + "deg)";
            });
      });

  var updatebars = function(){

      var xScale = d3.scale
          .linear()
          .domain([0,d3.max($scope.arr)])
          .range([0,width]);

      d3.select('.bars svg g')
          .selectAll('.bar')
          .data($scope.arr.slice(1))
          .transition()
          .duration(500)
          .style("fill", function(d, i) {
              return color(i % 20);
          })
          .style("width", function(d){
            if (d === 0){
              return 0;
            }
            return xScale(d);
          });
  };
  updatebars();

  setInterval(function(){
    updatebars();
  }, 1000);

});
