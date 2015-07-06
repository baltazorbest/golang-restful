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
    $scope.userSignup = function (user) {
        UserCreateFactory.create(user);
        $state.go('login');
    };
});

app.controller('UserCtrl', function ($scope, $stateParams, UserFactory) {
    $scope.user = UserFactory.show({ nickname: $stateParams.nickname });
});
