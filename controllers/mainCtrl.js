angular.module("d3compilation")
.controller("mainCtrl", function($scope, mainServ) {
  $scope.arr = mainServ.arr;
});
