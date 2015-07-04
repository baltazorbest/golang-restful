'use strict';

var services = angular.module('golangApp.services', ['ngResource']);

services.factory('ItemsFactory', function ($resource) {
    return $resource('/api/v1/items', {}, {
        query: { method: "GET" }
    });
});

services.factory('ItemCreateFactory', function ($resource) {
    return $resource('/api/v1/item', {}, {
        create: { method: "POST" }
    });
});

services.factory('ItemFactory', function ($resource) {
    return $resource('/api/v1/item/:id', {}, {
        show: { method: "GET" },
        update: { method: "PUT", params: {id: '@id'} },
        delete: { method: "DELETE", params: {id: '@id'} }
    });
});

services.factory('UserFactory', function ($auth, $window, $location) {
    return {
        parseJWT: function() {
            var token = $auth.getToken();
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        },
        isAuthed: function() {
            var token = $auth.getToken();
            if (token) {
                var params = this.parseJWT();
                return Math.round(new Date().getTime() / 1000) <= params.exp
            } else {
                return false;
            }
        },
        logout: function() {
            $auth.removeToken();
            $location.path("/")
        }
    };
});