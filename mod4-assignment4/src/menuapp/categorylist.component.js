(function(){
  'use strict';

  angular.module('MenuApp')
  .component('categoryList',{
    templateUrl: 'src/menuapp/templates/categorylist.template.html',
    bindings: {
      items: '<'
    }
  });


})();
