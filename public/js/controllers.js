'use strict';

var app = angular.module('golangApp.controllers', []);

app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    })
})

app.controller('ItemsCtrl', function( $scope, ItemsFactory  ) {
    ItemsFactory.query({}, function (responce) {
        $scope.items = responce.Items;
    } )
});

app.controller('ItemCtrl', function( $scope, $routeParams, ItemFactory ) {
    ItemFactory.show({id: $routeParams.itemId}, function(responce) {
        $scope.item = responce.Item;
    });

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

    ItemFactory.show({id: itemId}, function (responce) {
        $scope.item = responce.Item;
    });
    $scope.cancel = function () {
        $location.path('/');
    };
    $scope.updateItem = function () {
        ItemFactory.update( $scope.item );
        $location.path('/');
    };
});
