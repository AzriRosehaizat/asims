application.controller('gridController', function(navRightBarService, CurrentUser) {
    
    var self = this;
    var userRole;
    
    self.toggle = function() {
        navRightBarService.toggle();
    };
    
    self.isReader = function() {
        if (!userRole) userRole = CurrentUser.getRole();
        return (userRole === "reader");    
    };
});