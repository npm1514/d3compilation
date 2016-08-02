angular.module("d3compilation")
.service("mainServ", function() {
  this.arr = [];
  for (var i = 0; i < 20; i++) {
    this.arr.push({
      number: Math.ceil(Math.random()*250),
      color: d3.hsl(Math.random()*360,0.25 + Math.random()*0.75,0.25 + Math.random()*0.75)
    });
  }

});
