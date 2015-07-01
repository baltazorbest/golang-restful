var golangApp = angular.module('golangApp', ['ngRoute']);

golangApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "partials/items.html",
			controller: "ItemsController"
		})
		.when('/:itemId', {
			templateUrl: "partials/item.html",
			controller: "ItemController"
		})
		.otherwise({
			redirectTo: "/"
		});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$locationProvider.hashPrefix('!');
	$locationProvider.html5Mode(true);
});

golangApp.controller('ItemsController', function( $scope, $http ) {
	$http({ 'method': 'GET', url: "http://127.0.0.1:8888/api/v1/items/" }).success(function(data) {
		$scope.items = data.Items;
	});
});

golangApp.controller('ItemController', function( $scope, $http, $routeParams ) {
	var itemId = $routeParams.itemId;
	$http({'method': 'GET', url: "http://127.0.0.1:8888/api/v1/item/" + itemId }).success(function(data) {
		$scope.item = data.Item;
	});
});