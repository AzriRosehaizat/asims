application.controller('reportController', function($scope, $http){
    $scope.departments = [];
    
    $http.get('/Department')
        .success(function(data){
            $scope.departments = data;
        });
})