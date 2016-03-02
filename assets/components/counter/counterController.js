application.controller('counterController', function($http, _) {

    var self = this;
    self.box1 = {};
    self.box2 = {};
    self.box3 = {};
    self.box4 = {};
    
    var rStaff;
    var AcsStaff;
    var BioChemStaff;
    
    self.box1.text = 'Regular Staff Members';
    self.box2.text = 'ACS Academic Staff Members';
    self.box3.text = 'Bio Chemistry Staff Members';
    self.box4.text = 'Unique ACS Courses Available';

    $http.get('/regularStaff?populate')
        .then(function(res) {
            self.box1.data = res.data;
            rStaff = res.data;   
        });
    $http.get('academicstaff_department?departmentID=21')
        .then(function(res) {
            self.box2.data = res.data;
            AcsStaff = res.data;   
        });    
        
        $http.get('academicstaff_department?departmentID=23')
        .then(function(res) {
            self.box3.data = res.data;
            BioChemStaff = res.data;   
        }); 
        
        $http.get('/course?departmentID=21')
        .then(function(res) {
            self.box4.data = res.data;
            BioChemStaff = res.data;   
        });
        
});