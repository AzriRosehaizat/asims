application.service('counterService', function($http) {

    var self = this;

    self.rows = [];
    
    self.rows.push([{
        title: "On Leave",
        data: 24,
        footer: "Staff"
    }, {
        title: "Researches",
        data: 50,
        footer: "in Progress"
    }]);
    
    self.rows.push([{
        title: "Regular Staff",
        data: 3,
        footer: "not retired"
    }, {
        title: "Contract Staff",
        data: 200,
        footer: "not retired"
    }]);
});