application.service('counterService', function($http) {

    var self = this;

    self.rows = [];
    
    self.rows.push([{
        title: "Number of Staff on Leave",
        data: 24,
        footer: "testing..."
    }, {
        title: "Tenure approaching for",
        data: 50,
        footer: "staff."
    }]);
    
    self.rows.push([{
        title: "Number of Researches in Progress",
        data: 3,
        footer: "testing..."
    }, {
        title: "Number of Academic Staff",
        data: 200,
        footer: "testing..."
    }]);
});