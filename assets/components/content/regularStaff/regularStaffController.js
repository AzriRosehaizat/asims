application.controller('regularStaffController', function($scope, regularStaffs, DataService, ModalLoader, AnchorScroll, RegularStaffSchema, AddRegularStaffForm, EditRegularStaffForm) {

    /* Initialization */
    
    $scope.schema = RegularStaffSchema;
    $scope.form = AddRegularStaffForm;
    initAddForm();

    $scope.gridOptions = {
        multiSelect: false,
        enableRowHeaderSelection: false,
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
            field: 'tenureDate'
        }, {
            name: 'contApptDate',
            field: 'contApptDate'
        }, {
            name: 'Start Date',
            field: 'startDate'
        }, {
            name: 'End Date',
            field: 'endDate'
        }]
    };

    $scope.tabs = {
    };

    $scope.gridOptions.data = regularStaffs;
    
    /* Generic functions: need minor tweaks for another view */

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.regularStaffID === $scope.model.regularStaffID) {
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
        //     DataService.update('/regularStaff/', $scope.model)
        //         .then(function(data) {
        //             angular.merge($scope.row.entity, $scope.model);
        //         }, function(err) {
        //             console.warn(err);
        //         });
        // }
    };

    $scope.delete = function() {
        ModalLoader.delete($scope.row, '/regularStaff/')
            .result.then(function(data) {
                if (angular.isObject(data))
                    delete($scope.model);
            });
    };

    $scope.cancel = function() {
        if ($scope.form === AddRegularStaffForm)
            $scope.model = {};
        if ($scope.form === EditRegularStaffForm)
            angular.merge($scope.model, $scope.row.entity);

        $scope.model.switch = false;
    };

    $scope.gotoElement = function(eID) {
        AnchorScroll.scrollTo(eID);
    };

    function initAddForm() {
        $scope.form = AddRegularStaffForm;
        $scope.model = {};
    }

    function initEditForm(row) {
        $scope.form = EditRegularStaffForm;
        $scope.model = angular.copy(row.entity);
        $scope.model.switch = false;
    }
});