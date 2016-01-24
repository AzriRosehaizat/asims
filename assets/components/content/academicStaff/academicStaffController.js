application.controller('academicStaffController', function($scope, academicStaffs, DataService, ModalLoader, AnchorScroll, StaffSchema, AddStaffForm, EditStaffForm) {

    /* Initialization */
    
    $scope.schema = StaffSchema;
    $scope.form = AddStaffForm;
    initAddForm();

    $scope.gridOptions = {
        data: academicStaffs,
        multiSelect: false,
        enableRowHeaderSelection: false,
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
                data: academicStaffs,
                columnDefs: [{
                    name: 'DepartmentID',
                    field: 'AcademicStaff_Department[0].departmentID'
                }]
            }
        }
    };
    
    /* Generic functions: need minor tweaks for another view */

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.staffID === $scope.model.staffID) {
                row.isSelected = true;
                $scope.gotoElement('details');
            }
            else {
                $scope.row = row;
                initEditForm(row);
            }
        });
    };

    $scope.addRow = function() {
        initAddForm();
        // open the form
        $scope.model.switch = true;
        $scope.gotoElement('details');
    };

    $scope.onSubmit = function(form) {
        $scope.$broadcast('schemaFormValidate');
        console.log("Submit success");
        // if (form.$valid) {
        //     DataService.update('/academicStaff/', $scope.model)
        //         .then(function(data) {
        //             angular.merge($scope.row.entity, $scope.model);
        //         }, function(err) {
        //             console.warn(err);
        //         });
        // }
    };

    $scope.delete = function() {
        ModalLoader.delete($scope.row, '/academicStaff/')
            .result.then(function(data) {
                if (angular.isObject(data))
                    delete($scope.model);
            });
    };

    $scope.cancel = function() {
        if ($scope.form === AddStaffForm)
            $scope.model = {};
        if ($scope.form === EditStaffForm)
            angular.merge($scope.model, $scope.row.entity);

        $scope.model.switch = false;
    };

    $scope.gotoElement = function(eID) {
        AnchorScroll.scrollTo(eID);
    };

    function initAddForm() {
        $scope.form = AddStaffForm;
        $scope.model = {};
    }

    function initEditForm(row) {
        $scope.form = EditStaffForm;
        $scope.model = angular.copy(row.entity);
        $scope.model.switch = false;
    }
});