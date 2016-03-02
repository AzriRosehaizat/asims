application.controller('counterController', function($http, _) {

    var self = this;
    self.box1 = {};
    self.box2 = {};
    self.box3 = {};
    self.box4 = {};
    
    var rStaff;
    
    self.box1.text = 'Regular Staff Members';

    $http.get('/regularStaff')
        .then(function(res) {
            self.box1.data = res.data;
            rStaff = res.data;
            
            console.log(rStaff);
        });
        
        
});