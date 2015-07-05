'use strict';

var golangApp = angular.module('golangApp', [
	'ui.router',
	'golangApp.controllers',
	'golangApp.userControllers',
	'golangApp.services',
	'satellizer'
]);

golangApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {
	$authProvider.loginUrl = "/api/v1/auth";
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: "partials/items.html",
			controller: "ItemsCtrl"
		})
		.state('item-add', {
			url: '/add',
			templateUrl: "partials/item-form.html",
			controller: "ItemCreateCtrl"
		})
		.state('item-edit', {
			url: '/edit/{itemId:[0-9]*}',
			templateUrl: "partials/item-form.html",
			controller: "ItemEditCtrl"
		})
		.state('login', {
			url: '/login',
			templateUrl: "partials/user-form.html",
			controller: "LoginCtrl"
		})
		.state('user', {
			url: '/user',
			templateUrl: "partials/user-form.html",
			controller: "UserCtrl"
		})
		.state('item', {
			url: '/{itemId:[0-9]*}',
			templateUrl: "partials/item.html",
			controller: "ItemCtrl"
		});

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


