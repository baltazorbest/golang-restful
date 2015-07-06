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

app.controller('SignupCtrl', function ($scope, $state, UserCreateFactory) {
    $scope.isNew = true;
    $scope.userSignup = function (user) {
        UserCreateFactory.create(user);
        $state.go('login');
    };
});

app.controller('UserCtrl', function ($scope, $stateParams, UserFactory, AuthFactory) {
    var userinfo = AuthFactory.parseJWT();
    var username = $stateParams.username;
    $scope.user = UserFactory.show({ username: username });
    $scope.accessEdit = username == userinfo["username"];
});

app.controller('UserEditCtrl', function ($scope, UserFactory, $stateParams) {
    $scope.isNew = false;
    UserFactory.show({username: $stateParams.username}, function (response) {
        $scope.user = response.user;
    });
    $scope.userUpdate = function (user) {
        UserFactory.update(user);
    }
});

