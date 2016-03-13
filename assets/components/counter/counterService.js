application.service('counterService', function($http) {

    var self = this;
    
    self.rows = [];

    self.rows.push([{
        title: "On Leave",
        data: '',
        footer: "Staff",
        link: "application.leaves"
    }, {
        title: "Researches",
        data: '',
        footer: "In Progress",
        link: "application.research"
    }]);

    self.rows.push([{
        title: "Regular Staff",
        data: '',
        footer: "Currently Employed",
        link: "application.regularStaff"
    }, {
        title: "Contract Staff",
        data: '',
        footer: "Currently Employed",
        link: "application.contractStaff"
    }]);


});