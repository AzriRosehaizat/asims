application.controller('regularStaffController', function($scope, $http, $filter, $mdDialog, _, regularStaffService, SearchHelper, AnchorScroll) {

    lazyLoad(25);   // pageSize: 25
    $scope.gridTitle = 'Regular Staffs';
    $scope.regularStaffs = [];
    initAddForm();

    $scope.gridOptions = {
        multiSelect: false,
        enableRowHeaderSelection: false,
        enableHorizontalScrollbar: 0,
        columnDefs: [{
            name: 'First Name',
            field: 'firstName'
        }, {
            name: 'Last Name',
            field: 'lastName'
        }, {
            name: 'Primary Department',
            field: 'departmentCode'
        }, {
            name: 'Rank',
            field: 'rank'
        }, {
            name: 'Employee No',
            field: 'employeeNo'
        }, {
            name: 'Tenure Date',
            field: 'tenureDate'
        }, {
            name: 'Cont\' Appt\' Date',
            field: 'contApptDate'
        }]
    };

    $scope.tabs = {
        departments: {
            title: 'Departments',
            gridOptions: {
                data: [],
                columnDefs: [{
                    name: 'Code',
                    field: 'departmentCode'
                }, {
                    name: 'Name',
                    field: 'departmentTitle'
                }, {
                    name: 'Start Date',
                    field: 'startDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }]
            }
        },
        ranks: {
            title: 'Ranks',
            gridOptions: {
                data: [],
                columnDefs: [{
                    name: 'Name',
                    field: 'title'
                }, {
                    name: 'Description',
                    field: 'description'
                }, {
                    name: 'Start Date',
                    field: 'startDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }]
            }
        }
    };

    /* Generic functions: need minor tweaks for another view */

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            // var index = $scope.gridOptions.data.indexOf(row.entity),
            //     json = $scope.regularStaff[index];

            // $scope.tabs.departments.gridOptions.data = (function() {
            //     var flattenedData = [];
            //     for (var x in json.academicStaffID[0].departments) {
            //         flattenedData.push({
            //             startDate: json.academicStaffID[0].departments[x].startDate,
            //             departmentCode: json.academicStaffID[0].departments[x].departmentID.departmentCode,
            //             departmentTitle: json.academicStaffID[0].departments[x].departmentID.title
            //         });
            //     }
            //     return flattenedData;
            // })();

            // $scope.tabs.ranks.gridOptions.data = (function() {
            //     var flattenedData = [];
            //     for (var x in json.ranks) {
            //         flattenedData.push({
            //             startDate: json.ranks[x].startDate,
            //             title: json.ranks[x].rankID.title,
            //             description: json.ranks[x].rankID.description
            //         });
            //     }
            //     return flattenedData;
            // })();

            if (row.entity.regularStaffID === $scope.formData.regularStaffID) {
                row.isSelected = true;
                $scope.gotoElement('details');
            }
            else {
                $scope.row = row;
                $scope.formData = _.cloneDeep(row.entity);
                $scope.isEditing = true;
                $scope.detailTitle = 'Edit a Staff';
            }
        });
    };

    $scope.addRow = function() {
        initAddForm();
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

    $scope.delete = function(ev) {
        var confirm = $mdDialog.confirm()
            .title('You are deleting a row')
            .textContent('Are you sure?')
            .targetEvent(ev)
            .ok('Delete')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            $http.delete('/regularStaff/' + $scope.formData.regularStaffID)
                .then(function(res) {
                    // delete row
                    var index = $scope.gridOptions.data.indexOf($scope.row.entity);
                    $scope.gridOptions.data.splice(index, 1);
                    $scope.formData = {};
                }, function(err) {
                    console.warn(err);
                });
        }, function() {
            // Do something on cancel()
        });
    };

    $scope.cancel = function(form) {
        if ($scope.isEditing) {
            _.merge($scope.formData, $scope.row.entity);
        }
        else {
            $scope.formData = {};
        }
        // remove errors
        form.$setUntouched();
    };

    $scope.gotoElement = function(eID) {
        AnchorScroll.scrollTo(eID);
    };

    function initAddForm() {
        $scope.formData = {};
        $scope.isEditing = false;
        $scope.detailTitle = 'Add a Staff';
    }
    
    /* Lazy loading data */

    var count = 0;

    function lazyLoad(pageSize) {
        $http.get('RegularStaff/count')
            .then(function(res) {
                count = res.data;
                var startID = 0;
                getStaffs(startID, pageSize);
            });
    }

    function getStaffs(startID, pageSize) {
        $http.get('/RegularStaff/test?startID=' + startID + '&limit=' + pageSize)
            .then(function(res) {
                var flattenedData = regularStaffService.flattenData(res.data);
                $scope.regularStaffs = $scope.regularStaffs.concat(flattenedData);
                $scope.gridOptions.data = $scope.regularStaffs;
                if (count > startID) {
                    getStaffs(startID + pageSize, pageSize);
                }
            });
    }

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
        $scope.gridOptions.data = $scope.regularStaffs;
        
        while (searchStr) {
            var searchArray = searchStr.split(' ');
            $scope.gridOptions.data = $filter('filter')($scope.gridOptions.data, searchArray[0], undefined);
            searchArray.shift();
            searchStr = (searchArray.length !== 0) ? searchArray.join(' ') : '';
        }
    }
});