application.service('counterService', function($http) {

    var self = this;

    self.rows = [];

    self.rows.push([{
        title: "Regular Staff",
        gridTitle: "Regular Staff Currently On Leave",
        data: '',
        footer: "On Leave",
        link: "application.leaves",
        restLink: "Home/getInfo?type=leave"
    }, {
        title: "Research",
        gridTitle: "Researches Currently In Progress",
        data: '',
        footer: "In Progress",
        link: "application.research",
        restLink: "Home/getInfo?type=research"
    }]);

    self.rows.push([{
        title: "Regular Staff",
        gridTitle: "Currently Employed Regular Academic Staff",
        data: '',
        footer: "Currently Employed",
        link: "application.regularStaff",
        restLink: "Home/getInfo?type=regularStaff"
    }, {
        title: "Contract Staff",
        gridTitle: "Currently Employed Contract Academic Staff",
        data: '',
        footer: "Currently Employed",
        link: "application.contractStaff",
        restLink: "Home/getInfo?type=contractStaff"
    }]);


});
