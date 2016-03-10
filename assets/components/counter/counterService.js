application.service('counterService', function($http) {

    var self = this;

    self.rows = [];

    self.rows.push([{
        title: "On Leave",
        data: '',
        footer: "Staff"
    }, {
        title: "Researches",
        data: '',
        footer: "in Progress"
    }]);

    self.rows.push([{
        title: "Regular Staff",
        data: '',
        footer: "not retired"
    }, {
        title: "Contract Staff",
        data: '',
        footer: "not retired"
    }]);


});