'use strict';

var app = angular.module('golangApp.postControllers', ['ngResource']);

app.controller('PostsCtrl', function( $scope, $state, PostsFactory, PostFactory, AuthFactory  ) {
    $scope.authed = AuthFactory.isAuthed();
    $scope.posts = PostsFactory.query();
    $scope.deletePost = function (postId) {
        if (!$scope.authed) {
            $state.go('home');
            return;
        }
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
    var userinfo = AuthFactory.parseJWT();
    $scope.isNew = true;
    $scope.cancel = function () {
        $state.go('home');
    };
    $scope.createPost = function (post) {
        post.author_id = userinfo.id;
        PostCreateFactory.create( post );
        $state.go('home');
    };
});

app.controller('PostEditCtrl', function ( $scope, PostFactory, AuthFactory, $stateParams, $state ) {
    $scope.authed = AuthFactory.isAuthed();
    if (!$scope.authed) {
        $state.go('home');
        return;
    }
    var postId = $stateParams.postId;
    $scope.isNew = false;
    $scope.post = PostFactory.show({id: postId});
    $scope.cancel = function () {
        $state.go('home');
    };
    $scope.updatePost = function (post) {
        PostFactory.update( post );
        $state.go('home');
    };
});