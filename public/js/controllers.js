'use strict';

var app = angular.module('golangApp.controllers', []);

app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    })
});

app.controller('ItemsCtrl', function( $scope, ItemsFactory, ItemFactory  ) {
    $scope.items = ItemsFactory.query();

    $scope.deleteItem = function (itemId) {
        ItemFactory.delete({id: itemId});
        $scope.items = ItemsFactory.query();
    }
});

app.controller('ItemCtrl', function( $scope, $routeParams, ItemFactory ) {
    $scope.item = ItemFactory.show({id: $routeParams.itemId});
});

app.controller('ItemCreateCtrl', function ( $scope, ItemCreateFactory, $location ) {
    $scope.isNew = true;
    $scope.createItem = function () {
        ItemCreateFactory.create( $scope.item );
        $location.path('/');
    };
});

app.controller('ItemEditCtrl', function ( $scope, ItemFactory, $routeParams, $location ) {
    $scope.isNew = false;
    var itemId = $routeParams.itemId;

    $scope.item = ItemFactory.show({id: itemId});
    $scope.cancel = function () {
        $location.path('/');
    };
    $scope.updateItem = function () {
        ItemFactory.update( $scope.item );
        $location.path('/');
    };
});

app.controller('LoginCtrl', function ($scope, $auth, $location) {
    $scope.isAnonymouse = true;
    $scope.userLogin = function () {
        $auth.login( $scope.user).then(function () {
            $location.path('/');
        });
    };
});

app.controller('UserCtrl', function ($scope, $http, $auth) {
    var token = $auth.getToken()
    $scope.isAnonymouse = false;
    $http.get('/api/v1/auth' + token).success(function (users) {
        console.log(users)
    }).error(function (error) {
        console.log(error)
    })
})