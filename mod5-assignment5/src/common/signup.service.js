(function() {
    'use strict';

    angular.module('common')
        .service('SignUpService', SignUpService);

    function SignUpService() {
        return {
            data: {

                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                favItem: '',
                title: '',
                description: '',
                hasData: false
            },
            update: function(user) {

                this.data.firstName = user.fname;
                this.data.lastName = user.lname;
                this.data.email = user.email;
                this.data.phone = user.phone;
                this.data.favItem = user.favItem;
                this.data.title = user.favItemTitle;
                this.data.description = user.favItemDescription;
                this.data.hasData = true;
            }
        };
    }
})();
