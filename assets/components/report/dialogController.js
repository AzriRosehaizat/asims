application.controller('dialogController', ['$mdDialog', 'formService', 'title', function($mdDialog, formService, title) {

    var self = this;
    self.title = title;
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

        if (isFromSelected && self.range[1]) {
            var maxStr = self.range[1].slice(0, 4);
            min = 2000;
            max = parseInt(maxStr, 10);
        }
        else if (self.range[0]) {
            var minStr = self.range[0].slice(0, 4);
            min = parseInt(minStr, 10);
            max = new Date().getFullYear() + 1;
        }
        else {
            // Don't change years when the input has no value
            return;
        }

        self.years = [];
        for (var i = max; i >= min; i--) {
            var nextYear = (i + 1).toString().slice(2);
            var academicYear = i.toString() + '-' + nextYear;
            self.years.push(academicYear);
        }
    };
}]);