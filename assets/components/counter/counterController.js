application.controller('counterController', function(counterService, $http, $scope, $mdDialog) {

    var self = this;
    $http.get('/Home/getCountInfo?type=leave').then(function(res) {
        self.rows[0][0].data = res.data[0].NoOfLeave;
    });

    $http.get('/Home/getCountInfo?type=research').then(function(res) {
        self.rows[0][1].data = res.data[0].NoOfResearch;
    });

    $http.get('/Home/getCountInfo?type=regularStaff').then(function(res) {
        self.rows[1][0].data = res.data[0].NoOfRegularStaff;
    });

    $http.get('/Home/getCountInfo?type=contractStaff').then(function(res) {
        self.rows[1][1].data = res.data[0].NoOfContractStaff;
    });

    self.rows = counterService.rows;


    $scope.showModal = function(data, ev) {

    // define dialog 
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'components/counter/modalDialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
        
        // Instatiate grid properties based on data
        function DialogController($scope, $mdDialog) {
            $scope.hideGrid = true;
            $scope.gridOptions = {
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;

                }
            };
            
            // get data
            $http.get(data.restLink)
                .success(function(restLink) {
                    $scope.gridOptions.data = restLink;
                });

            $scope.close = function() {
                $mdDialog.hide();
            };
            
            // grid title
            $scope.gridTitle = data.gridTitle;
        }
    };


});
