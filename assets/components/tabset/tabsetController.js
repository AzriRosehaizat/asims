application.controller('tabsetController', ['navRightBarService', 'CurrentUser', '$state', function(navRightBarService, CurrentUser, $state) {

    var self = this;
    var userRole;

    self.toggle = function() {
        navRightBarService.toggle();
    };
    
    self.redirect = function(tab) {
        $state.go(tab.link);
    };
    
    self.isReader = function() {
        if (!userRole) userRole = CurrentUser.getRole();
        return (userRole === "reader");
    };
    
    self.pageExist = function(tab) {
        if (tab)
        return (tab.link) ? true : false;
    };
}]);