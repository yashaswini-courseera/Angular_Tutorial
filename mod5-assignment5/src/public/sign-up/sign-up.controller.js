(function() {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService', 'SignUpService'];

    function SignUpController(MenuService, SignUpService) {
        var signUpCtrl = this;

        signUpCtrl.submit = function() {
            var favItem = signUpCtrl.user.favItem;
            var promise = MenuService.getFavMenuItem(favItem.toUpperCase());

            promise.then(function(response) {
                    if (response.short_name === favItem.toUpperCase()) {
                        signUpCtrl.favItemInvalid = false;
                        signUpCtrl.user.favItemTitle = response.name;
                        signUpCtrl.user.favItemDescription = response.description;
                    } else {
                        signUpCtrl.favItemInvalid = true;
                    }
                    SignUpService.update(signUpCtrl.user);
                })
                .catch(function(error) {
                    signUpCtrl.favItemInvalid = true;
                });
                signUpCtrl.completed = true;
        };
    }
})();
