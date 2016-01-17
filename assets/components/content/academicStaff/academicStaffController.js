application.controller('academicStaffController', function($scope, DataService, RowEditor, StaffSchema, EditStaffForm) {
    
    $scope.title = "Academic Staff";
    $scope.schema = StaffSchema;
    $scope.form = EditStaffForm;
    
    $scope.gridOptions = {
        multiSelect: false,
        enableRowHeaderSelection: false,
        enableExpandableRowHeader: false,
        expandableRowTemplate: '/components/gridRow/expandableRow.html',
        expandableRowHeight: 27,

        columnDefs: [{
            name: 'First Name',
            field: 'firstName'
        }, {
            name: 'Last Name',
            field: 'lastName'
        }, {
            name: 'Employee No',
            field: 'employeeNo'
        }, {
            name: 'DepartmentID',
            field: 'AcademicStaff_Department[0].departmentID'
        }]
    };

    $scope.tabs = {
        department: {
            title: 'AcademicStaff_Department',
            gridOptions: {
                columnDefs: [{
                    name: 'DepartmentID',
                    field: 'AcademicStaff_Department[0].departmentID'
                }]
            }
        }
    };

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            // copy the row for details view
            $scope.model = angular.copy(row.entity);
            // to toggle details form
            $scope.model.switch = false;
        });
    };

    if (!angular.isObject($scope.gridOptions.data)) {
        getStaffs();
    }

    function getStaffs() {
        DataService.get('/academicStaff/')
            .then(function(data) {
                $scope.gridOptions.data = data;
                $scope.tabs.department.gridOptions.data = data;
            });
    }
    
    // Functions below are for details view.
    
    $scope.onSubmit = function(form) {
        delete($scope.model.switch);  
        $scope.$broadcast('schemaFormValidate');
        console.log("Submit success");
        // if (form.$valid) {
        //     DataService.update('/academicStaff/', $scope.model)
        //         .then(function(data) {
        //             // copy row values over
        //             $scope.row.entity = angular.extend($scope.row.entity, $scope.model);
        //         }, function(err) {
        //             console.warn(err);
        //         });
        // }
    };
    
    $scope.onCancel = function() {
        $scope.model = $scope.row.entity;
    };
});