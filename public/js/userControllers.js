'use strict';

var app = angular.module('golangApp.userControllers', ['ngResource']);

app.run(function ($rootScope, $state, $http, $auth, AuthFactory) {
    $rootScope.user = AuthFactory.parseJWT();
    $rootScope.isAuthed = AuthFactory.isAuthed();
    $http.defaults.headers.common['Authorization'] = $auth.getToken();
});

app.controller('LoginCtrl', function ($scope, $auth, $state, AuthFactory) {
    $scope.userLogin = function (user) {
        AuthFactory.login(user);
    };
});

app.controller('UserCreateCtrl', function ($scope, $state, UserCreateFactory) {
    $scope.isNew = true;
    $scope.userSignup = function (user) {
        UserCreateFactory.create(user);
        $state.go('login');
    };
});

app.controller('UserDetailCtrl', function ($scope, $stateParams, UserFactory, AuthFactory) {
    var userinfo = AuthFactory.parseJWT();
    var login = $stateParams.login;
    $scope.user = UserFactory.show({ login: login });
    $scope.accessEdit = login == userinfo["login"];
});

app.controller('UserEditCtrl', function ($scope, UserFactory, $stateParams) {
    $scope.isNew = false;
    $scope.user = UserFactory.show({login: $stateParams.login});
    $scope.userUpdate = function (user) {
        UserFactory.update(user);
    }
});

