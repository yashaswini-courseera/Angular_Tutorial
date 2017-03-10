(function(){
  'use strict';

  angular.module('ShoppingList',['Spinner']);

  angular.module('ShoppingList')
  .config(function(){
    console.log("Shopping list config fired")

  })
  .run(function(){
    console.log("shopping list run fired");
  });
})();
