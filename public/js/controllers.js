'use strict';

var app = angular.module('golangApp.controllers', []);

app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

app.controller('ItemsCtrl', function( $scope, ItemsFactory, ItemFactory  ) {
    $scope.items = ItemsFactory.query();

    $scope.deleteItem = function (itemId) {
        ItemFactory.delete({id: itemId});
        $scope.items = ItemsFactory.query();
    };
});

app.controller('ItemCtrl', function( $scope, $stateParams, ItemFactory ) {
    $scope.item = ItemFactory.show({id: $stateParams.itemId});
});

app.controller('ItemCreateCtrl', function ( $scope, ItemCreateFactory, $location ) {
    $scope.isNew = true;
    $scope.createItem = function (item) {
        ItemCreateFactory.create( item.Item );
        $location.path('/');
    };
});

app.controller('ItemEditCtrl', function ( $scope, ItemFactory, $stateParams, $state ) {
    $scope.isNew = false;
    var itemId = $stateParams.itemId;

    $scope.item = ItemFactory.show({id: itemId});
    $scope.cancel = function () {
        $state.go('home');
    };
    $scope.updateItem = function (item) {
        ItemFactory.update( item.Item );
        $state.go('home');
    };
});