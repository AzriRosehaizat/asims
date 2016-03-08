application.controller('tabsetController', function(navRightBarService, $state) {
    
    var self = this;
    
    self.toggle = function() {
        navRightBarService.toggle();
    };
    
    self.redirect = function(tab) {
        $state.go(tab.link);
        console.log(tab.link);
    };
});