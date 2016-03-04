application.controller('gridController', function(navRightBarService) {
    
    var self = this;
    
    self.toggle = function() {
        navRightBarService.toggle();
    };
});