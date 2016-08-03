application.controller('navRightBarController', ['$scope', '$state', '_', 'formService', 'acService', 'navRightBarService', function($scope, $state, _, formService, acService, navRightBarService) {

    $scope.$state = $state;
    $scope.fs = formService;
    var service = navRightBarService;

    $scope.submit = function() {
        formService.submit($scope.fs.formData);
    };

    $scope.cancel = function() {
        formService.cancel($scope.fs.formData);
        navRightBarService.toggle();
    };

    $scope.delete = function(ev) {
        formService.delete(ev, $scope.fs.formData);
    };

    $scope.querySearch = function(searchText, url, output) {
        return acService.querySearch($scope.fs.formData, searchText, url, output);
    };

    $scope.resetValue = function(reset) {
        if (reset) acService.resetValue($scope.fs.formData, reset);
    };
    
    $scope.assignValue = function(assign) {
        if (assign) acService.assignValue($scope.fs.formData, assign);
    };

    $scope.changeState = function(link) {
        $state.go(link);
    };
    
    $scope.isEmpty = function(values) {
        var isEmpty = false;
        _.forEach(values, function(value) {
            if (!$scope.fs.formData.model[value]) 
                return isEmpty = true;
        });
        return isEmpty;
    };

    $scope.getSelectLabel = function(name, path, defaultText) {
        return ($scope.fs.formData.model[name]) ? _.get($scope.fs.formData.model, path) : defaultText;
    };

    /* navRightBar related */
    // using ng-style to change its style
    $scope.style = changeStyle();

    function changeStyle() {
        if (!service.isLockedOpen) {
            return {
                "z-index": "60"
            };
        }
        // Otherwise, use z-index: 58 in navRightBar.css
    }
}]);