(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: 'NarrowItDownController',
            controllerAs: 'foundList',
            bindToController: true
        };
        return ddo;
    }
    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var foundList = this;
        foundList.searchTerm = "";
        foundList.getFoundItems = function() {
            foundList.items = MenuSearchService.getFoundItems(foundList.searchTerm);
            return foundList.items;
        }
        foundList.removeItem = function(index) {
            foundList.items.splice(index, 1);
        }
    }
    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        var service = this;
        service.getFoundItems = function(searchTerm) {
            var foundItems = [];
            var result;
            var menuItems = [];
            var response = $http({
                method: "GET",
                url: " https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function(response) {
                //process the data here and return found items list
                result = response.data;
                menuItems = result.menu_items;
                for (var i = 0; i < menuItems.length; i++) {
                    if (searchTerm != "" && menuItems[i].description.toLowerCase().indexOf(searchTerm) != -1) {
                        foundItems.push(menuItems[i]);
                    }

                }
            }).catch(function(error) {
                //error message
                console.log(error);
            });
            return foundItems;
        };
    }
})();
