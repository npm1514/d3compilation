angular.module("d3compilation")
.service("mainServ", function() {
  this.arr = [];
  for (var i = 0; i < 21; i++) {
    this.arr.push(Math.ceil(Math.random()*250));
  }

});
