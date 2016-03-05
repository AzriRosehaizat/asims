application.service('counterService', function($http) {

    var self = this;

    self.rows = [];
    
    self.rows.push([{
        title: "Regular Staff",
        data: 100,
        footer: "testing..."
    }, {
        title: "Contract Staff",
        data: 50,
        footer: "testing..."
    }]);
    
    self.rows.push([{
        title: "Recent Research",
        data: "ASIMS",
        footer: "testing..."
    }, {
        title: "Current Issue",
        data: 14,
        footer: "testing..."
    }]);
});