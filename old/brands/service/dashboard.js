angular.module('skWholesale')
.service('dashboardServiceCall', function($http) {
  this.addRecord = function () {
    return 'Record Added Successful';
  }
  this.getRecord = function () {
    $http.get("./stub/stub.json").then(function (response) {
      return response.data;
    });
  }
});