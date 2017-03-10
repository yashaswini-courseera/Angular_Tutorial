(function(){
  'use strict';

  angular.module('ShoppingListEventsApp',[])
  .controller('ShoppingListController',ShoppingListController)
  .factory('ShoppingListFactory',ShoppingListFactory)
  .service('WeightLossFilterService', WeightLossFilterService)
  .component('shoppingList',{
    templateUrl:'shoppingList.html',
    controller:ShoppinglistComponentController,
    bindings:{
      items:'<',
      myTitle:'@title',
      onRemove:'&'
    }
  })
  .component('loadingSpinner',{
    templateUrl:'spinner.html',
    controller:SpinnerController
  });
SpinnerController.$inject=['$rootScope'];
function SpinnerController($rootScope){
  var $ctrl = this;

  var cancelListener = $rootScope.$on('shoppinglist:processing',function(event,data){
    console.log("event is:",event);
    console.log("data is:",data);
    if(data.on)
    $ctrl.showSpinner=true;
    else {
      $ctrl.showSpinner=false;
    }
  });
  $ctrl.$onDestroy = function () {
    cancelListener();
  };
}

  ShoppinglistComponentController.$inject=['$rootScope','$element','$q','WeightLossFilterService'];
  function ShoppinglistComponentController($rootScope, $element, $q, WeightLossFilterService){
    var $ctrl=this;
    var totalItems;

  $ctrl.$onInit = function () {
    totalItems = 0;
  };
  $ctrl.$doCheck=function(){
    if ($ctrl.items.length !== totalItems) {
      totalItems = $ctrl.items.length;
      $rootScope.$broadcast('shoppinglist:processing',{on:true});
      var promises=[];
      for(var i=0;i<totalItems;i++){
        promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
      }
      $q.all(promises)
      .then(function (result) {
        // Remove cookie warning
        var warningElem = $element.find('div.error');
        warningElem.slideUp(900);
      })
      .catch(function (result) {
        // Show cookie warning
        var warningElem = $element.find('div.error');
        warningElem.slideDown(900);
      })
      .finally(function () {
        $rootScope.$broadcast('shoppinglist:processing', { on: false });
      });
  }
};



    $ctrl.cookiesInList = function () {
      for (var i = 0; i < $ctrl.items.length; i++) {
        var name = $ctrl.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          return true;
        }
      }

      return false;
    };

    $ctrl.remove = function (myIndex) {
      $ctrl.onRemove({index:myIndex});
    };
    //life cycle methods of the component controller
    $ctrl.$onInit = function(){
      console.log("we are in $onInit");
    };
    $ctrl.$onChanges=function(changeObj){
      console.log("changes are:",changeObj)
    };
    // $ctrl.$postLink =function(){
    //   $scope.$watch('$ctrl.cookiesInList()',function(newValue,oldValue){
    //     console.log($element);
    //     if(newValue === true){
    //       var warningElem = $element.find('div.error');
    //       warningElem.slideDown(900);
    //     }
    //     else {
    //       var warningElem = $element.find('div.error');
    //       warningElem.slideUp(900);
    //     }
    //   });
    // }
  };
  ShoppingListController.$inject = ['ShoppingListFactory'];
  function ShoppingListController(ShoppingListFactory){
    var list = this;

    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory();

    list.items = shoppingList.getItems();
    var origTitle = "Shopping List #1";
    list.title = origTitle + " (" + list.items.length + " items )";

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function () {
      shoppingList.addItem(list.itemName, list.itemQuantity);
      list.title = origTitle + " (" + list.items.length + " items )";
    }

    list.removeItem = function (itemIndex) {
      this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
      shoppingList.removeItem(itemIndex);
      this.title = origTitle + " (" + list.items.length + " items )";
    };
  }


  function ShoppingListService(maxItems){
    var service = this;

    // List of shopping items
    var items = [];

    service.addItem = function (itemName, quantity) {
      if ((maxItems === undefined) ||
      (maxItems !== undefined) && (items.length < maxItems)) {
        var item = {
          name: itemName,
          quantity: quantity
        };
        items.push(item);
      }
      else {
        throw new Error("Max items (" + maxItems + ") reached.");
      }
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };

    service.getItems = function () {
      return items;
    };
  };

  function ShoppingListFactory() {
    var factory = function (maxItems) {
      return new ShoppingListService(maxItems);
    };
    return factory;
  }
  WeightLossFilterService.$inject = ['$q', '$timeout']
function WeightLossFilterService($q, $timeout) {
  var service = this;

  service.checkName = function (name) {
    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for cookies
      if (name.toLowerCase().indexOf('cookie') === -1) {
        deferred.resolve(result)
      }
      else {
        result.message = "Stay away from cookies, Yaakov!";
        deferred.reject(result);
      }
    }, 3000);

    return deferred.promise;
  };


  service.checkQuantity = function (quantity) {
    var deferred = $q.defer();
    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for too many boxes
      if (quantity < 6) {
        deferred.resolve(result);
      }
      else {
        result.message = "That's too much, Yaakov!";
        deferred.reject(result);
      }
    }, 1000);

    return deferred.promise;
  };
}
})();
