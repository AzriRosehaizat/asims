application.controller('tabsetController', function(navRightBarService) {
    
    var self = this;
    
    self.toggle = function() {
        navRightBarService.toggle();
    };
});