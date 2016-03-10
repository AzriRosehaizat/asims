application.controller('counterController', function(counterService, $http) {

    var self = this;
    
    
    
    $http.get('/Home/getInfo?type=leave').then(function(res){
        self.rows[0][0].data = res.data[0].NoOfLeave;
    });
    
    $http.get('/Home/getInfo?type=research').then(function(res){
        self.rows[0][1].data = res.data[0].NoOfResearch;
    });
    
    $http.get('/Home/getInfo?type=regularStaff').then(function(res){
        self.rows[1][0].data = res.data[0].NoOfRegularStaff;
    });
    
    $http.get('/Home/getInfo?type=contractStaff').then(function(res){
        self.rows[1][1].data = res.data[0].NoOfContractStaff;
    });
    
    self.rows = counterService.rows;
    //self.rows[1].data = 51;
});