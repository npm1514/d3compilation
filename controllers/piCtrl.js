angular.module("d3compilation")
.controller("piCtrl", function($scope, mainServ) {
  $scope.arr = mainServ.arr;


  //donut pie chart
  var svg = d3.select(".donutpies")
      .append("svg") //creates platform for pie chart
      .attr("width", 276) //size of pie chart svg platform
      .attr("height", 276) //size of pie chart svg platform
      .append("g")//appends shapes together
      .attr("transform", "translate(" + 138 + "," + 138 + ")"); //moves pie chart to center of div

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) {
          return d;
      });

  var color = d3.scale.category10();

  var donutarc = d3.svg
      .arc()
      .outerRadius(138)
      .innerRadius(88);
      // .cornerRadius(138);

  d3.select(".donutpies")
      .select("g")
      .selectAll("path")
      .data(pie($scope.arr.slice(1)))
      .enter()
      .append("path")
      .attr("d", donutarc)
      .style("fill", function(d, i) {
          return color(i % 20);
      });


  d3.select(".donutpies svg")
      .on('click', function(){
        d3.select(this)
        .style({
          "transform": "rotateZ(-3600deg)",
          "transition-duration": "55s"
        })
      });

  function makedonutpie (){
    d3.select(".donutpies")
    .select('g')
    .selectAll("path")
    .data(pie($scope.arr.slice(1)))
    .transition()
    .duration(500)
    .attr("d", donutarc);
  }

  setInterval(function(){
    makedonutpie();
  }, 1000)

});
