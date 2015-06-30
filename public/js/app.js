var myApp = angular.module('myApp', []);

myApp.controller('golang', function( $scope, $http ) {
	$http({ 'method': 'GET', url: "http://127.0.0.1:8888/api/v1/items/", }).success(function(data) {
		$scope.items = data.Items;
	}); 
});