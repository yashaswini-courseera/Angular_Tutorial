(function(){
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function RoutesConfig($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home',{
      url:'/',
      templateUrl:'src/menuapp/templates/home.template.html'
    })
    .state('categoriesList',{
      url:'/categories-list',
      templateUrl:'src/menuapp/templates/main-categorieslist.template.html',
      controller:'CategoriesListController as categoriesList',
      resolve:{
        categories: ['MenuDataService', function(MenuDataService){
               return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('itemsList',{
      url:'/items-list/{category}',
      templateUrl:'src/menuapp/templates/main-itemslist.template.html',
      controller:'ItemsListController as itemsList',
      resolve: {
        items: ['$stateParams','MenuDataService',function($stateParams,MenuDataService){
          return MenuDataService.getItemsForCategory($stateParams.category);
        }]
      }
    });

  }
})();
