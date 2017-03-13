(function() {
    'use strict';

    angular.module('Data')
        .service('MenuDataService', MenuDataService);
    MenuDataService.$inject = ['$http'];

    function MenuDataService($http) {
        var service = this;

        service.getAllCategories = function() {
            var categoriesList = [];
            return $http({
                    method: 'GET',
                    url: 'https://davids-restaurant.herokuapp.com/categories.json'
                }).then(function(response) {
                    var categories = response.data;
                    for (var i = 0; i < categories.length; i++) {
                        categoriesList.push(categories[i]);
                    }
                    return categoriesList;
                })
                .catch(function(error) {
                    console.log("error in service.getAllCategories method");
                });

        }
        service.getItemsForCategory = function(categoryShortname) {
            var itemsList = [];
            return $http({
                    method: 'GET',
                    url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
                    params: {
                        category: categoryShortname
                    }
                }).then(function(response) {
                    var items = response.data.menu_items;
                    for (var i = 0; i < items.length; i++) {
                        itemsList.push(items[i]);
                    }
                    return itemsList;
                })
                .catch(function(error) {
                    console.log("error in service.getItemsForCategory method");
                });
        }
    }
})();
