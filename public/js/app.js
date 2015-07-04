'use strict';

var golangApp = angular.module('golangApp', [
	'ngRoute',
	'golangApp.controllers',
	'golangApp.userControllers',
	'golangApp.services',
	'satellizer'
]);

golangApp.config(function($routeProvider, $httpProvider, $authProvider) {
	$authProvider.loginUrl = "/api/v1/auth";

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
		.when('/login', {
			templateUrl: "partials/user-form.html",
			controller: "LoginCtrl"
		})
		.when('/user', {
			templateUrl: "partials/user-form.html",
			controller: "UserCtrl"
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


