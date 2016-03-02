application.service('navRightBarService', function($mdSidenav) {

    this.toggle = function(formData) {
        $mdSidenav('right').then(function(instance) {
            if (!instance.isLockedOpen()) {
                // It's used in navRightBarController to change its z-index
                formData.isLockedOpen = false;
                instance.toggle().then(function() {
                    // Do something
                });
            }
            else {
                formData.isLockedOpen = true;
            }
        });
    };
});