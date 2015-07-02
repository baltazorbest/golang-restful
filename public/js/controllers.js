golangApp.controller('ItemsController', function( $scope, $http ) {
    $http({ 'method': 'GET', url: "/api/v1/items/" }).success(function(data) {
        $scope.items = data.Items;
    });

    $scope.deleteItem = function (id) {
        $http.delete("/api/v1/item/" + id).success(function(){
            alert("Item is deleted");;
        })
    }
});

golangApp.controller('ItemController', function( $scope, $http, $routeParams ) {
    $http({'method': 'GET', url: "/api/v1/item/" + $routeParams.itemId }).success(function(data) {
        $scope.item = data.Item;
    });
});

golangApp.controller('ItemCreateController', function ( $scope, $http ) {
    $scope.isNew = true;
    $scope.createItem = function (item) {
        $http.post("/api/v1/item/", {
            title: item.title,
            description: item.description,
            user_name: item.user_name
        }).success(function () {
            alert("New item created");
        });
    }
});

golangApp.controller('ItemEditController', function ( $scope, $http, $routeParams ) {
    var itemId = $routeParams.itemId;
    $scope.isNew = false;
    $http({'method': 'GET', url: "/api/v1/item/" + itemId }).success(function (data) {
        $scope.item = {"title": data.Item.title, "description": data.Item.description, "user_name": data.Item.user_name};
    });
    $scope.updateItem = function (item) {
        $http.put("/api/v1/item/" + itemId, {
            user_name: item.user_name,
            title: item.title,
            description: item.description
        }).success(function () {
            alert("This item updated");
        });
    };
});