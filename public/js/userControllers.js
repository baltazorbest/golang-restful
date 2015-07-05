'use strict';

var app = angular.module('golangApp.userControllers', ['ngResource']);

app.run(function ($rootScope, $state, $http, $auth, UserFactory) {
    $rootScope.user = UserFactory.parseJWT();
    $http.defaults.headers.common['Authorization'] = $auth.getToken();
});

app.controller('LoginCtrl', function ($scope, $auth, $state, $rootScope, UserFactory) {
    $scope.userLogin = function (user) {
        $auth.login(user).then(function () {
            $rootScope.isAuthed = true;
            $state.go('home')
        });
    };
});

app.controller('UserCtrl', function ($scope, $stateParams, UserFactory, UserDetailFactory) {
    $scope.user = UserDetailFactory.show({ nickname: $stateParams.nickname });
});