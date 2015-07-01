var golangApp = angular.module('golangApp', ['ngRoute']);

golangApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "partials/items.html",
			controller: "ItemsController"
		})
		.when('/add', {
			templateUrl: "partials/item-add.html"
		})
		.when('/edit/:itemId', {
			templateUrl: "partials/item-edit.html",
			controller: "ItemEditController"
		})
		.when('/:itemId', {
			templateUrl: "partials/item.html",
			controller: "ItemController"
		})
		.otherwise({
			redirectTo: "/"
		});
});

golangApp.controller('ItemsController', function( $scope, $http ) {
	$http({ 'method': 'GET', url: "http://127.0.0.1:8888/api/v1/items/" }).success(function(data) {
		$scope.items = data.Items;
	});
});

golangApp.controller('ItemController', function( $scope, $http, $routeParams ) {
	$http({'method': 'GET', url: "http://127.0.0.1:8888/api/v1/item/" + $routeParams.itemId }).success(function(data) {
		$scope.item = data.Item;
	});
});

golangApp.controller('ItemEditController', function ( $scope, $http, $routeParams ) {
	$http({'method': 'GET', url: "http://127.0.0.1:8888/api/v1/item/" + $routeParams.itemId }).success(function (data) {
		$scope.item = data.Item;
	});
	$scope.updateItem = function (item) {
		console.log(item);
	};
});