var golangApp = angular.module('golangApp', ['ngRoute']);

golangApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "partials/items.html",
			controller: "ItemsController"
		})
		.when('/add', {
			templateUrl: "partials/item-form.html",
			controller: "ItemCreateController"
		})
		.when('/edit/:itemId', {
			templateUrl: "partials/item-form.html",
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


