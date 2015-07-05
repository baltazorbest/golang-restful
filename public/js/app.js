'use strict';

var golangApp = angular.module('golangApp', [
	'ui.router',
	'golangApp.controllers',
	'golangApp.userControllers',
	'golangApp.services',
	'satellizer'
]);

golangApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {
	$authProvider.loginUrl = "/api/v1/login";
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: "partials/item/items.html",
			controller: "ItemsCtrl"
		})
		.state('item-add', {
			url: '/add',
			templateUrl: "partials/item/item-form.html",
			controller: "ItemCreateCtrl"
		})
		.state('item-edit', {
			url: '/edit/{itemId:[0-9]*}',
			templateUrl: "partials/item/item-form.html",
			controller: "ItemEditCtrl"
		})
		.state('login', {
			url: '/login',
			templateUrl: "partials/user/user-form.html",
			controller: "LoginCtrl"
		})
		.state('logout', {
			url: '/logout',
			controller: function($state, UserFactory, $rootScope) {
				UserFactory.logout();
				$rootScope.isAuthed = false;
				$state.go('home');
			}
		})
		.state('userinfo', {
			url: '/user/{nickname:[a-zA-Z0-9]*}',
			templateUrl: "partials/user/user-detail.html",
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


