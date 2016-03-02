application.controller('navRightBarController', function($scope, $state, $http, $mdSidenav, _, formService, acService) {

    $scope.$state = $state;
    $scope.fs = formService;

    $scope.submit = function() {
        formService.submit($scope.fs.formData);
    };

    $scope.cancel = function() {
        formService.cancel($scope.fs.formData);
    };

    $scope.delete = function(ev) {
        formService.delete(ev, $scope.fs.formData);
    };

    $scope.querySearch = function(searchText, url, output) {
        return acService.querySearch($scope.fs.formData, searchText, url, output);
    };
    
    $scope.changeValue = function(change) {
        acService.changeValue($scope.fs.formData, change);
    };

    /* For ng-disabled */
    $scope.isObject = function(value) {
        var modelAttr = $scope.fs.formData.model[value];
        return _.isObject(modelAttr);
    };

    /* Currently not working */
    $scope.changeState = function(link) {
        console.log("change state to " + link);
        $state.go(link);
    };

    /* navRightBar related */
    // using ng-style to change its css
    $scope.style = changeStyle();

    function changeStyle() {
        if (!$scope.fs.formData.isLockedOpen) {
            return {
                "z-index": "60"
            };
        }
        // Otherwise, use z-index: 58 in navRightBar.css
    }
});