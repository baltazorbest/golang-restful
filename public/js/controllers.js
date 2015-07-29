'use strict';

var app = angular.module('golangApp.controllers', []);

app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

app.controller('PostsCtrl', function( $scope, PostsFactory, PostFactory  ) {
    $scope.posts = PostsFactory.query();

    $scope.deletePost = function (postId) {
        PostFactory.delete({id: postId});
        $scope.posts = PostsFactory.query();
    };
});

app.controller('PostCtrl', function( $scope, $stateParams, PostFactory ) {
    $scope.post = PostFactory.show({id: $stateParams.postId});

});

app.controller('PostCreateCtrl', function ( $scope, PostCreateFactory, $state, AuthFactory ) {
    if (!AuthFactory.isAuthed() ) {
        $state.go('login');
    }
    $scope.isNew = true;
    $scope.cancel = function () {
        $state.go('home');
    };
    $scope.createPost = function (post) {
        PostCreateFactory.create( post.Post );
        $state.go('home');
    };
});

app.controller('PostEditCtrl', function ( $scope, PostFactory, $stateParams, $state ) {
    $scope.isNew = false;
    var postId = $stateParams.postId;

    $scope.post = PostFactory.show({id: postId});
    $scope.cancel = function () {
        $state.go('home');
    };
    $scope.updatePost = function (post) {
        PostFactory.update( post );
        $state.go('home');
    };
});
