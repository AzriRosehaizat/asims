application.controller('regularStaffController', function($scope, $http, $filter, regularStaffService, SearchHelper, AnchorScroll) {

    $scope.gridTitle = 'Regular Staffs';
    $scope.rStaff = {}; // regularStaff
    $scope.rStaff.oData = []; // .originalData
    $scope.rStaff.fData = []; // .flattenedData
    $scope.formData = {};
    regularStaffService.initAddForm($scope.formData);
    lazyLoad(25); // pageSize: 25

    $scope.gridOptions = regularStaffService.gridOptions();
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

            var index = $scope.gridOptions.data.indexOf(row.entity),
                json = $scope.rStaff.oData[index];

            $scope.tabs.departments.gridOptions.data = regularStaffService.flattenDepartments(json.academicStaffID[0].departments);
            $scope.tabs.ranks.gridOptions.data = regularStaffService.flattenRanks(json.ranks);
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

    /* Lazy loading data */

    var count = 0;

    function lazyLoad(pageSize) {
        $http.get('RegularStaff/count')
            .then(function(res) {
                count = res.data;
                getStaffs(0, pageSize);
            });
    }

    function getStaffs(startID, pageSize) {
        $http.get('/RegularStaff/test?startID=' + startID + '&limit=' + pageSize)
            .then(function(res) {
                var flattenedData = regularStaffService.flattenData(res.data);
                $scope.rStaff.oData = $scope.rStaff.oData.concat(res.data);
                $scope.rStaff.fData = $scope.rStaff.fData.concat(flattenedData);
                $scope.gridOptions.data = $scope.rStaff.fData;
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
        $scope.gridOptions.data = $scope.rStaff.fData;

        while (searchStr) {
            var searchArray = searchStr.split(' ');
            $scope.gridOptions.data = $filter('filter')($scope.gridOptions.data, searchArray[0], undefined);
            searchArray.shift();
            searchStr = (searchArray.length !== 0) ? searchArray.join(' ') : '';
        }
    }
});