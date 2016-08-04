angular.module("d3compilation")
.controller("forceCircleCtrl", function($scope, mainServ) {
    $scope.arr = mainServ.arr;

    var width = 276,
        height = 276,
        max = 0;
    for (var i = 0; i < $scope.arr.length; i++) {
        $scope.arr[i].number = parseInt($scope.arr[i].number);
        if($scope.arr[i].number > max){
          max = $scope.arr[i].number;
        }
    }

    var color = d3.scale.category10();

    var nodes = $scope.arr.map(function(d) {
      return {
        radius: d.number/max*276/8
      };
    })

    var force = d3.layout
        .force()
        .gravity(0.025)
        .charge(function(d, i) {
          return d ? 0 : -1000;
        })
        .nodes(nodes)
        .size([width, height]);

    var root = nodes[0];
        root.radius = 50;
        root.fixed = true;

    force.start();

    var svg = d3.select(".forcecircles")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("circle")
        .data(nodes.slice(1))
        .enter()
        .append("svg:circle")
        .attr("r", function(d) {
            return d.radius;
        })
        .style("fill", function(d, i) {
            return color(i % 20);
        });

    force.on("tick", function(e) {
      var q = d3.geom.quadtree(nodes),
          i = 0,
          n = nodes.length;

      while (++i < n) {
        q.visit(collide(nodes[i]));
      }

      svg.selectAll("circle")
          .attr("cx", function(d) {
            return d.x;
          })
          .attr("cy", function(d) {
            return d.y;
        });
    });

    svg.on("mousemove", function() {
      var p1 = d3.mouse(this);
      root.px = p1[0];
      root.py = p1[1];
      force.resume();
    });

    function collide(node) {
      var r = node.radius + 16,
          nx1 = node.x - r,
          nx2 = node.x + r,
          ny1 = node.y - r,
          ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = node.radius + quad.point.radius;
          if (l < r) {
            l = (l - r) / l * .5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2
            || x2 < nx1
            || y1 > ny2
            || y2 < ny1;
      };
    }
    // var updateforcecircles = function(){
    //
    //   var nodes = $scope.arr.map(function(d) {
    //     return {
    //       radius: d.number/max*276/8
    //     };
    //   })
    //
    //   svg.selectAll("circle")
    //       .data(nodes.slice(1))
    //       .enter()
    //       .transition()
    //       .duration('500')
    //       .attr("r", function(d) {
    //           return d.radius;
    //       });
    // };
    // updateforcecircles();
    //
    // setInterval(function(){
    //   updateforcecircles();
    // },500);

});
