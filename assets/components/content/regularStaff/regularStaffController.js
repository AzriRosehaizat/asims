application.controller('regularStaffController', function($scope, $http, $q, $filter, $mdDialog, _, regularStaffs, SearchHelper, AnchorScroll) {

    /* Initialization */

    $scope.staff = {};
    $scope.regularStaff = regularStaffs.data;
    $scope.isEditing = false;
    $scope.gridTitle = 'Regular Staff';
    $scope.detailTitle = 'Add a Staff';

    $scope.gridOptions = {
        data: (function() {
            var flattenedData = [];
            for (var x in $scope.regularStaff) {

                flattenedData.push({
                    employeeNo: $scope.regularStaff[x].academicStaffID[0].employeeNo,
                    firstName: $scope.regularStaff[x].academicStaffID[0].firstName,
                    lastName: $scope.regularStaff[x].academicStaffID[0].lastName,
                    departmentCode: $scope.regularStaff[x].academicStaffID[0].departments[0].departmentID.departmentCode,
                    contApptDate: $scope.regularStaff[x].contApptDate,
                    rank: (function() {
                        for (var y in $scope.regularStaff[x].ranks) {
                            if (!$scope.regularStaff[x].ranks[y].endDate)
                                return $scope.regularStaff[x].ranks[y].rankID.title;
                        }
                    })(),
                    tenureDate: $scope.regularStaff[x].tenureDate
                });
            }
            return flattenedData;
        })(),
        multiSelect: false,
        infiniteScrollRowsFromEnd: 15,
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
            field: 'tenureDate',
            cellFilter: 'date:\'yyyy-MM-dd\''
        }, {
            name: 'Cont\' Appt\' Date',
            field: 'contApptDate',
            cellFilter: 'date:\'yyyy-MM-dd\''
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
        gridApi.infiniteScroll.on.needLoadMoreData($scope, function() {
            var pageSize = 25,
                startID = $scope.regularStaff[$scope.regularStaff.length - 1].regularStaffID,
                promise = $q.defer();

            $http.get('/RegularStaff/test?startID=' + startID + '&limit=' + pageSize)
                .success(function(page) {
                    $scope.regularStaff = $scope.regularStaff.concat(page);
                    $scope
                        .gridOptions
                        .data = $scope.gridOptions.data.concat((function() {
                            var flattenedData = [];
                            for (var x in page) {
                                flattenedData.push({
                                    employeeNo: page[x].academicStaffID[0].employeeNo,
                                    firstName: page[x].academicStaffID[0].firstName,
                                    lastName: page[x].academicStaffID[0].lastName,
                                    rank: (function() {
                                        for (var y in page[x].ranks) {
                                            if (!page[x].ranks[y].endDate)
                                                return page[x].ranks[y].rankID.title;
                                        }
                                    })(),
                                    departmentCode: page[x].academicStaffID[0].departments[0].departmentID.departmentCode,
                                    contApptDate: page[x].contApptDate,
                                    tenureDate: page[x].tenureDate
                                });
                            }
                            return flattenedData;
                        })());

                    gridApi
                        .infiniteScroll
                        .dataLoaded(false, ((page.length !== 0) || (page.length == pageSize)))
                        .then(function() {
                            promise.resolve();
                        });
                })
                .error(function(error) {
                    gridApi.infiniteScroll.dataLoaded();
                    promise.reject();
                });
            return promise.promise;
        });

        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            // console.log(row.entity);
            var index = $scope.gridOptions.data.indexOf(row.entity),
                json = $scope.regularStaff[index];

            // console.log(json);

            $scope.tabs.departments.gridOptions.data = (function() {
                var flattenedData = [];
                for (var x in json.academicStaffID[0].departments) {
                    flattenedData.push({
                        startDate: json.academicStaffID[0].departments[x].startDate,
                        departmentCode: json.academicStaffID[0].departments[x].departmentID.departmentCode,
                        departmentTitle: json.academicStaffID[0].departments[x].departmentID.title
                    });
                }
                return flattenedData;
            })();

            $scope.tabs.ranks.gridOptions.data = (function() {
                var flattenedData = [];
                for (var x in json.ranks) {
                    flattenedData.push({
                        startDate: json.ranks[x].startDate,
                        title: json.ranks[x].rankID.title,
                        description: json.ranks[x].rankID.description
                    });
                }
                return flattenedData;
            })();

            if (row.entity.regularStaffID === $scope.model.regularStaffID) {
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

    $scope.delete = function(ev) {
        var confirm = $mdDialog.confirm()
            .title('You are deleting a row')
            .textContent('Are you sure?')
            .targetEvent(ev)
            .ok('Delete')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            $http.delete('/regularStaff/' + $scope.staff.id)
                .then(function(res) {
                    // delete row
                    var index = $scope.gridOptions.data.indexOf($scope.row.entity);
                    $scope.gridOptions.data.splice(index, 1);
                    $scope.staff = {};
                }, function(err) {
                    console.warn(err);
                });
        }, function() {
            // Do something on cancel()
        });
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