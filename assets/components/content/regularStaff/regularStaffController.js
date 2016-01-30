application.controller('regularStaffController', function($scope, $http, $filter, _, regularStaffs, SearchHelper, AnchorScroll) {

    /* Initialization */

    $scope.staff = {};
    $scope.isEditing = false;
    $scope.gridTitle = 'Regular Staff';
    $scope.detailTitle = 'Add a Staff';

    $scope.gridOptions = {
        data: regularStaffs.data,
        multiSelect: false,
        enableRowHeaderSelection: false,
        enableHorizontalScrollbar: 0,
        columnDefs: [{
            name: 'First Name',
            field: 'academicStaffID.firstName'
        }, {
            name: 'Last Name',
            field: 'academicStaffID.lastName'
        }, {
            name: 'Employee No',
            field: 'academicStaffID.employeeNo'
        }, {
            name: 'Tenure Date',
            field: 'tenureDate',
            cellFilter: 'date:\'yyyy-MM-dd\''
        }, {
            name: 'Cont\' Appt\' Date',
            field: 'contApptDate',
            cellFilter: 'date:\'yyyy-MM-dd\''
        }, {
            name: 'Start Date',
            field: 'startDate',
            cellFilter: 'date:\'yyyy-MM-dd\''
        }, {
            name: 'End Date',
            field: 'endDate',
            cellFilter: 'date:\'yyyy-MM-dd\''
        }]
    };

    $scope.tabs = {};

    /* Generic functions: need minor tweaks for another view */

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.regularStaffID === $scope.staff.regularStaffID) {
                row.isSelected = true;
                $scope.gotoElement('details');
            }
            else {
                $scope.row = row;
                $scope.staff = _.cloneDeep(row.entity);
                $scope.isEditing = true;
                $scope.detailTitle = 'Edit a Staff';
            }
        });
    };

    $scope.addRow = function() {
        $scope.staff = {};
        $scope.isEditing = false;
        $scope.detailTitle = 'Add a Staff';
        $scope.gotoElement('details');
    };

    $scope.submit = function() {
        if ($scope.isEditing) {
            // Do put request
        }
        else {
            // Do post request
        }
    };

    $scope.delete = function() {
        // ModalLoader.delete($scope.row, '/regularStaff/', $scope.staff.regularStaffID)
        //     .result.then(function(data) {
        //         if (_.isObject(data)) {
        //             $scope.staff = {};
        //         }
        //     });
    };

    $scope.cancel = function(form) {
        if ($scope.isEditing) {
            _.merge($scope.staff, $scope.row.entity);
        }
        else {
            $scope.staff = {};
        }
        // remove errors
        form.$setUntouched();
    };

    $scope.gotoElement = function(eID) {
        AnchorScroll.scrollTo(eID);
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
        $scope.gridOptions.data = regularStaffs.data;

        while (searchStr) {
            var searchArray = searchStr.split(' ');
            $scope.gridOptions.data = $filter('filter')($scope.gridOptions.data, searchArray[0], undefined);
            searchArray.shift();
            searchStr = (searchArray.length !== 0) ? searchArray.join(' ') : '';
        }
    }
});