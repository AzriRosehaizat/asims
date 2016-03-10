application.controller('dialogController', function($mdDialog, formService) {

    var self = this;
    self.years = formService.getYears();
    self.range = [];

    self.hide = function() {
        $mdDialog.hide();
    };

    self.cancel = function() {
        $mdDialog.cancel();
    };

    self.submit = function() {
        $mdDialog.hide(self.range);
    };
    
    /* Dynamically change dropdown years */
    self.changeYears = function(isFromSelected) {
        var min, max;
        self.years = [];
        
        if (isFromSelected) {
            min = self.range[0];
            max = new Date().getFullYear() + 1;
        }
        else {
            min = 1970;
            max = self.range[1];
        }
        
        for (var i = max; i >= min; i--) {
                self.years.push(i);
            }
    };
});