application.controller('courseController', function($scope, courses, courseService, SearchHelper) {

    $scope.gridTitle = 'Course';
    $scope.course = courses.data;
    $scope.formData = {};

    $scope.gridOptions = courseService.gridOptions();
    $scope.gridOptions.data = $scope.course;
    $scope.tabs = courseService.tabs();
    
    courseService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.course);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.courseID === $scope.formData.model.courseID) {
                row.isSelected = true;
            }
            else {
                $scope.row = row;
                courseService.initEditForm($scope.formData, row);
            }

            // courseService.getDepartment($scope.tabs.departments, row);
            // courseService.getRank($scope.tabs.ranks, row);
            // courseService.getEmployment($scope.tabs.employment, row);
        });
    };

    $scope.addRow = function() {
        courseService.initAddForm($scope.formData, $scope.gridOptions.data);
    };
    
    $scope.editRow = function() {
        courseService.initEditForm($scope.formData, $scope.row);
    };
});