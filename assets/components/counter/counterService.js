application.service('counterService', function($http) {

    var self = this;
    
    self.rows = [];

    self.rows.push([{
        title: "On Leave",
        data: '',
        footer: "Staff",
        link: "application.leaves",
        rest: "Home/getInfo?type=leave"
    }, {
        title: "Researches",
        data: '',
        footer: "In Progress",
        link: "application.research",
        rest: "Home/getInfo?type=research"
    }]);

    self.rows.push([{
        title: "Regular Staff",
        data: '',
        footer: "Currently Employed",
        link: "application.regularStaff",
        rest: "Home/getInfo?type=regularStaff"
    }, {
        title: "Contract Staff",
        data: '',
        footer: "Currently Employed",
        link: "application.contractStaff",
        rest: "Home/getInfo?type=contractStaff"
    }]);


});