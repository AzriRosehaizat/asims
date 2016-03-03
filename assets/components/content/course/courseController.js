application.controller('courseController', function($scope, courses, courseService, cTabService, SearchHelper, toaster) {

    $scope.gridTitle = 'Course';
    $scope.course = courses.data;
    $scope.formData = {};

    $scope.gridOptions = courseService.gridOptions();
    $scope.gridOptions.data = $scope.course;

    $scope.tabs = cTabService.tabs();
    $scope.tab = $scope.tabs.section;

    courseService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.course);

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
        if($scope.row)
            courseService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
        else 
            toaster.info("Select a row first.");
    };
    
});