(function() {
    'use strict';

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['data', 'ApiPath'];

    function MyInfoController(data, ApiPath) {
        var myInfoCtrl = this;

        myInfoCtrl.data = data;
        myInfoCtrl.basePath = ApiPath;
    }

})();
