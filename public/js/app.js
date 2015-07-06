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
			templateUrl: "partials/user/login.html",
			controller: "LoginCtrl"
		})
		.state('logout', {
			url: '/logout',
			controller: function($state, AuthFactory, $rootScope) {
				AuthFactory.logout();
				$rootScope.isAuthed = false;
				$state.go('home');
			}
		})
		.state('signup', {
			url: '/signup',
			templateUrl: "partials/user/form.html",
			controller: "SignupCtrl"
		})
		.state('userinfo', {
			url: '/user/{username:[a-zA-Z0-9]*}',
			templateUrl: "partials/user/detail.html",
			controller: "UserCtrl"
		})
		.state('useredit', {
			url: '/user/edit/{username:[a-zA-Z0-9]*}',
			templateUrl: "partials/user/form.html",
			controller: "UserEditCtrl"
		})
		.state('item', {
			url: '/{itemId:[0-9]*}',
			templateUrl: "partials/item/item.html",
			controller: "ItemCtrl"
		});

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


