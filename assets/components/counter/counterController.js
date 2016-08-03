application.controller('counterController', ['$http', '$mdDialog', 'counterService', function($http, $mdDialog, counterService) {

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

    self.showModal = function(data, ev) {

        // define dialog 
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'components/counter/modalDialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });

        // Instatiate grid properties based on data
        function DialogController($scope, $state, $mdDialog, _, SearchHelper) {
            $scope.gridTitle = data.gridTitle;
            $scope.hideGrid = true; // Are we using this?

            $scope.gridOptions = {
                onRegisterApi: function(gridApi) {
                    gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                        // Kind of double click...
                        if ($scope.uid === row.uid) {
                            $scope.close();
                            goToSearch(row.entity);
                        }
                        else $scope.uid = row.uid;
                    });
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

            function goToSearch(entity) {
                $state.go(data.link).then(function() {
                    var query = "";

                    if (data.link === "application.research")
                        query = entity["Title"];
                    else
                        query = entity["First Name"] + " " + entity["Last Name"];

                    SearchHelper.set(query);
                });
            }
        }
        
    };
    
}]);
