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
