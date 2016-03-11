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
        footer: "currently employed"
    }, {
        title: "Contract Staff",
        data: '',
        footer: "currently employed"
    }]);


});