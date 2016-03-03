application.controller('courseController', function($scope, courses, courseService, cTabService, SearchHelper, toaster) {

    $scope.gridTitle = 'Course';
    $scope.courseData = courses.data;
    $scope.formData = {};

    $scope.gridOptions = courseService.gridOptions();
    $scope.gridOptions.data = $scope.courseData;

    $scope.tabs = cTabService.tabs();
    $scope.tab = $scope.tabs.section;

    courseService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.courseData);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            $scope.tabRow = null;

            courseService.initEditForm($scope.formData, $scope.gridOptions.data, row);

            cTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        courseService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        if ($scope.row)
            courseService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
        else
            toaster.info("Select a row first.");
    };
    
    $scope.selectTab = function(tab) {
        $scope.tab = tab;
        $scope.tabRow = null;
        // Read only
        // if ($scope.row) $scope.addTabRow();
    };
    
    $scope.tabs.section.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            cTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };
    
    $scope.addTabRow = function() {
        if ($scope.row)
            cTabService.initAddForm($scope.formData, $scope.tab, $scope.row);
        else
            toaster.info("Select a row first in the main table.");
    };
    
    $scope.editTabRow = function() {
        if ($scope.tabRow)
            cTabService.initEditForm($scope.formData, $scope.tab, $scope.tabRow);
        else
            toaster.info("Select a row first in the tab table.");
    };
});