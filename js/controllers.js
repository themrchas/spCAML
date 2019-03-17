
var app = angular.module("app1",[]);

    app.controller("ctrlCaml", ['$scope', 'dataService',function($scope,dataService) {  
 
  //  var sp = dataService.getItem();

    console.log('hellow world');

    $scope.test = "helloWorld";


    dataService.getRequestDigest().then(function(reqId) {

        console.log('Request Id is',reqId);
    })
  
    
}]);




