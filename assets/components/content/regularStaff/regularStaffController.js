application.controller('regularStaffController', function($scope, $http, $q, regularStaffs, ModalLoader, AnchorScroll, RegularStaffSchema, AddRegularStaffForm, EditRegularStaffForm) {

    /* Initialization */
    
    $scope.schema = RegularStaffSchema;
    $scope.form = AddRegularStaffForm;
    initAddForm();
    $scope.regularStaff = regularStaffs.data;
    console.log($scope.regularStaff);
    
    $scope.gridOptions = {
        data: (function(){
            var flattenedData = [];
            for (var x in $scope.regularStaff){
                flattenedData.push(
                    {   
                        employeeNo : $scope.regularStaff[x].academicStaffID[0].employeeNo,
                        firstName : $scope.regularStaff[x].academicStaffID[0].firstName,
                        lastName : $scope.regularStaff[x].academicStaffID[0].lastName,
                        departmentCode: $scope.regularStaff[x].academicStaffID[0].departments[0].departmentID.departmentCode,
                        contApptDate : $scope.regularStaff[x].contApptDate,
                        tenureDate : $scope.regularStaff[x].tenureDate
                    }
                );
            }
            return flattenedData;
        })(),
        multiSelect: false,
        infiniteScrollRowsFromEnd: 30,
        infiniteScrollDown: true,
        enableRowHeaderSelection: false,
        columnDefs: [{
            name: 'First Name',
            field: 'firstName'
        }, {
            name: 'Last Name',
            field: 'lastName'
        }
        , {
            name: 'Primary Department',
            field: 'departmentCode'
            
        }, {
           name: 'Rank',
           field: 'Rank'
        }, {
            name: 'Employee No',
            field: 'employeeNo'
        },
        {
            name: 'Tenure Date',
            field: 'tenureDate',
            cellFilter: 'date:\'yyyy-MM-dd\''
        }, {
            name: 'contApptDate',
            field: 'contApptDate',
            cellFilter: 'date:\'yyyy-MM-dd\''
        }
        
        ]
    };

    $scope.tabs = {
        departments: {
            title: 'Departments',
            gridOptions: {
                data: [],
                columnDefs: [{
                    name: 'Code',
                    field: 'departmentCode'
                },
                {
                    name: 'Name',
                    field: 'departmentTitle'
                },
                {
                    name: 'Start Date',
                    field: 'startDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }]
            }
        }
    };
    
    /* Generic functions: need minor tweaks for another view */

    $scope.gridOptions.onRegisterApi = function( gridApi ) {
        gridApi.infiniteScroll.on.needLoadMoreData($scope, function(){
            var pageSize = 50,
                startID = $scope.regularStaff[$scope.regularStaff.length-1].regularStaffID,
                promise = $q.defer();

            $http.get('/RegularStaff/test?startID='+startID+'&limit='+pageSize)
            .success(function( page ) {
                $scope.regularStaff = $scope.regularStaff.concat( page );
                $scope
                .gridOptions
                .data = $scope.gridOptions.data.concat((function(){
                    var flattenedData = [];
                    for (var x in page){
                        flattenedData.push(
                            { 
                                employeeNo : $scope.regularStaff[x].academicStaffID[0].employeeNo,
                                firstName : $scope.regularStaff[x].academicStaffID[0].firstName,
                                lastName : $scope.regularStaff[x].academicStaffID[0].lastName,
                                departmentCode: $scope.regularStaff[x].academicStaffID[0].departments[0].departmentID.departmentCode,
                                contApptDate : $scope.regularStaff[x].contApptDate,
                                tenureDate : $scope.regularStaff[x].tenureDate,
                                json : page[x]
                            }
                        );
                    }
                    return flattenedData;
                })());
                
                gridApi
                .infiniteScroll
                .dataLoaded( false, ( (page.length !== 0 ) || ( page.length == pageSize )) )
                .then(function() {
                    promise.resolve();
                });
            })
            .error(function( error ) {
                gridApi.infiniteScroll.dataLoaded();
                promise.reject();
            });
            return promise.promise;
        });
        
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            var index = $scope.gridOptions.data.indexOf(row.entity),
                json = $scope.regularStaff[index]; 
            
            $scope.tabs.departments.gridOptions.data = (function(){
                var flattenedData = [];
                for( var x in json.academicStaffID[0].departments){
                    flattenedData.push(
                        {   
                            startDate : json.academicStaffID[0].departments[x].startDate,
                            departmentCode : json.academicStaffID[0].departments[x].departmentID.departmentCode,
                            departmentTitle : json.academicStaffID[0].departments[x].departmentID.title
                        }   
                    );
                }
                return flattenedData;
            })();
            
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