application.controller('counterController', function(counterService, $http, modalService, $rootScope, $interval, $scope, $timeout) {

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



    $scope.showModal = function(data) {
        var myModal = new modalService();
        $rootScope.hideGrid = true;
        $rootScope.gridOptions = ""
        $rootScope.gridOptions = {
            onRegisterApi: function(gridApi) {
                $rootScope.gridApi = gridApi;

                // call resize every 500 ms for 5 s after modal finishes opening - usually only necessary on a bootstrap modal
                $interval(function() {
                    $rootScope.gridApi.core.handleWindowResize();
                }, 500, 10);
            }
        };

        $http.get(data)
            .success(function(data) {
                $rootScope.gridOptions.data = data;
            });

        myModal.open();

    };


});

application.service('modalService', ['$compile', '$rootScope', '$timeout', function($compile, $rootScope, $timeout) {
    return function() {
        var elm;
        var modal = {
            open: function() {

                var html = '<div class="modal" ng-style="modalStyle"><div id="modalReport" class="modal-dialog"><div class="modal-content"><div class="modal-header"></div><div class="modal-body"><div ui-grid="gridOptions" ui-grid-selection ui-grid-resize-columns ui-grid-exporter class="grid"></div></div><div class="modal-footer"><md-button class="md-raised md-primary md-hue-1" ng-click="close()">Close</md-button></div></div></div></div>';
                elm = angular.element(html);
                angular.element(document.body).prepend(elm);

                $rootScope.close = function() {
                    modal.close();
                };

                $rootScope.modalStyle = {
                    "display": "block"
                };

                $compile(elm)($rootScope);
            },
            close: function() {
                if (elm) {
                    elm.remove();
                }
                refresh();

            },

        };
        refresh: function refresh() {
            $rootScope.refresh = true;
            $timeout(function() {
                $rootScope.refresh = false;
            }, 0);
        }


        return modal;


    };


}]);