'use strict';

var app = angular.module('golangApp.userControllers', ['ngResource']);

app.run(function ($rootScope, $location, $http, $auth, UserFactory) {
    $rootScope.isAuthed = UserFactory.isAuthed();
    $rootScope.logout = function () {
        UserFactory.logout();
        $location.path('/');
    };
    $http.defaults.headers.common['Authorization'] = $auth.getToken();
});

app.controller('LoginCtrl', function ($scope, $auth, $location, $rootScope, UserFactory) {
    $scope.isAnonymouse = UserFactory.isAuthed();
    $scope.userLogin = function (user) {
        $auth.login(user).then(function () {
            $rootScope.isAuthed = true;
            $location.path('/user');
        });
    };
});

app.controller('UserCtrl', function ($scope, $http, UserFactory) {

    $scope.isAnonymouse = false;
    $http.get('/api/v1/auth').success(function (users) {
        console.log(users);
        console.log( UserFactory.isAuthed() );
    }).error(function (error) {
        console.log(error);
    })
});