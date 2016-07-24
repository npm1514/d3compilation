angular.module("d3compilation")
.controller("mainCtrl", function($scope) {
  $scope.arr = [];
  for (var i = 0; i < 20; i++) {
    $scope.arr.push(Math.round(Math.random()*250));
  }

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
          return d3.hsl(Math.random()*360,0.25 + Math.random()*0.75,0.25 + Math.random()*0.75)
      });

  var updatebars = function(){
      var newarr = [];
      for (var i = 0; i < $scope.arr.length; i++) {
          newarr.push(parseInt($scope.arr[i]));
      }
      d3.select('.bars')
          .selectAll('.bar')
          .data($scope.arr)
          .transition()
          .duration('500')
          .style("width", function(d){
              return (d/(d3.max(newarr)))*276 + "px";
          });
  };
  updatebars();

  //bubby pie chart
  var svg = d3.select(".bubblypies")
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

  var arc = d3.svg
      .arc()
      .outerRadius(138)
      .innerRadius(20)
      .cornerRadius(138);

  d3.select("g")
      .selectAll("path")
      .data(pie($scope.arr))
      .enter()
      .append("path")
      .attr("d", arc)
      .style("fill", function(d) {
          return d3.hsl(Math.random()*360, Math.random(),Math.random());
      });

  function makebubblypie (){
    d3.select('g')
    .selectAll("path")
    .data(pie($scope.arr))
    .transition()
    .duration(500)
    .attr("d", arc);
  }

  //donut pie chart
  svg = d3.select(".donutpies")
      .append("svg") //creates platform for pie chart
      .attr("width", 276) //size of pie chart svg platform
      .attr("height", 276) //size of pie chart svg platform
      .append("g")//appends shapes together
      .attr("transform", "translate(" + 138 + "," + 138 + ")"); //moves pie chart to center of div

  var donutarc = d3.svg
      .arc()
      .outerRadius(138)
      .innerRadius(88);
      // .cornerRadius(138);

  d3.select(".donutpies")
      .select("g")
      .selectAll("path")
      .data(pie($scope.arr))
      .enter()
      .append("path")
      .attr("d", donutarc)
      .style("fill", function(d) {
          return d3.hsl(Math.random()*360, Math.random(),Math.random());
      });

  function makedonutpie (){
    d3.select(".donutpies")
    .select('g')
    .selectAll("path")
    .data(pie($scope.arr))
    .transition()
    .duration(500)
    .attr("d", donutarc);
  }

  





  setInterval(function(){
    updatebars();
    makedonutpie();
    makebubblypie();
  }, 1000);



});
