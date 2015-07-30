'use strict';

var golangApp = angular.module('golangApp', [
	'ui.router',
	'golangApp.controllers',
	'golangApp.postControllers',
	'golangApp.userControllers',
	'golangApp.services',
	'satellizer'
]);

golangApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {
	$authProvider.loginUrl = "/api/v1/user/login";
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: "public/partials/post/posts.html",
			controller: "PostsCtrl"
		})
		.state('post-add', {
			url: '/add',
			templateUrl: "public/partials/post/post-form.html",
			controller: "PostCreateCtrl"
		})
		.state('post-edit', {
			url: '/edit/{postId:[0-9]*}',
			templateUrl: "public/partials/post/post-form.html",
			controller: "PostEditCtrl"
		})
		.state('login', {
			url: '/login',
			templateUrl: "public/partials/user/login.html",
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
			templateUrl: "public/partials/user/form.html",
			controller: "UserCreateCtrl"
		})
		.state('userinfo', {
			url: '/user/{login:[a-zA-Z0-9]*}',
			templateUrl: "public/partials/user/detail.html",
			controller: "UserDetailCtrl"
		})
		.state('useredit', {
			url: '/user/edit/{login:[a-zA-Z0-9]*}',
			templateUrl: "public/partials/user/form.html",
			controller: "UserEditCtrl"
		})
		.state('post', {
			url: '/{postId:[0-9]*}',
			templateUrl: "public/partials/post/post.html",
			controller: "PostCtrl"
		});

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


