'use strict';

var golangApp = angular.module('golangApp', [
	'ngRoute',
	'golangApp.controllers',
	'golangApp.services'
]);

golangApp.config(function($routeProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "partials/items.html",
			controller: "ItemsCtrl"
		})
		.when('/add', {
			templateUrl: "partials/item-form.html",
			controller: "ItemCreateCtrl"
		})
		.when('/edit/:itemId', {
			templateUrl: "partials/item-form.html",
			controller: "ItemEditCtrl"
		})
		.when('/:itemId', {
			templateUrl: "partials/item.html",
			controller: "ItemCtrl"
		})
		.otherwise({
			redirectTo: "/"
		});

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


