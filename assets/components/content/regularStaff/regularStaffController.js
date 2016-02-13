application.controller('regularStaffController', function($scope, $filter, staffs, regularStaffService, SearchHelper, AnchorScroll) {

    $scope.gridTitle = 'Regular Staffs';
    $scope.rStaff = staffs.data;
    $scope.formData = {};
    regularStaffService.initAddForm($scope.formData);

    $scope.gridOptions = regularStaffService.gridOptions();
    $scope.gridOptions.data = $scope.rStaff;
    $scope.tabs = regularStaffService.tabs();

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.regularStaffID === $scope.formData.staff.regularStaffID) {
                row.isSelected = true;
                $scope.gotoElement('details');
            }
            else {
                $scope.row = row;
                regularStaffService.initEditForm($scope.formData, row);
            }
            
            // TODO add http get calls

            $scope.tabs.departments.gridOptions.data = "";
            $scope.tabs.ranks.gridOptions.data = "";
        });
    };

    $scope.addRow = function() {
        regularStaffService.initAddForm($scope.formData);
        $scope.gotoElement('details');
    };

    $scope.gotoElement = function(eID) {
        AnchorScroll.scrollTo(eID);
    };

    $scope.submit = function() {
        if ($scope.formData.isEditing) {
            // Do put request
        }
        else {
            // Do post request
        }
    };

    $scope.cancel = function() {
        regularStaffService.cancel($scope.formData, $scope.row);
    };

    $scope.delete = function(ev) {
        regularStaffService.delete(ev, $scope.gridOptions.data, $scope.formData);
    };

    /* Search function */

    $scope.$watch(
        function() {
            return SearchHelper.search;
        },
        function(newVal) {
            searchData(newVal);
        }
    );

    // ref: http://plnkr.co/edit/ijjzLX3jN7zWBvc5sdnQ?p=preview
    function searchData(searchStr) {
        $scope.gridOptions.data = $scope.rStaff;

        while (searchStr) {
            var searchArray = searchStr.split(' ');
            $scope.gridOptions.data = $filter('filter')($scope.gridOptions.data, searchArray[0], undefined);
            searchArray.shift();
            searchStr = (searchArray.length !== 0) ? searchArray.join(' ') : '';
        }
    }
});