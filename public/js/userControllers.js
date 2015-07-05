'use strict';

var app = angular.module('golangApp.userControllers', ['ngResource']);

app.run(function ($rootScope, $state, $http, $auth, AuthFactory) {
    $rootScope.user = AuthFactory.parseJWT();
    $http.defaults.headers.common['Authorization'] = $auth.getToken();
});

app.controller('LoginCtrl', function ($scope, $auth, $state, $rootScope) {
    $scope.userLogin = function (user) {
        $auth.login(user).then(function () {
            $rootScope.isAuthed = true;
            $state.go('home')
        });
    };
});

app.controller('UserCtrl', function ($scope, $stateParams, UserFactory) {
    $scope.user = UserFactory.show({ nickname: $stateParams.nickname });
});
