application.service('navRightBarService', function($mdSidenav) {
    
    var self = this;
    self.isLockedOpen;

    self.toggle = function() {
        $mdSidenav('right').then(function(instance) {
            if (!instance.isLockedOpen()) {
                // It's used in navRightBarController to change its z-index
                self.isLockedOpen = false;
                instance.toggle().then(function() {
                    // Do something
                });
            }
            else {
                self.isLockedOpen = true;
            }
        });
    };
});