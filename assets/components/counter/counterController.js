application.controller('counterController', function(counterService) {

    var self = this;

    self.rows = counterService.rows;
});