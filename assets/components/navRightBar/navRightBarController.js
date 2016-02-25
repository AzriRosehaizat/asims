application.controller('navRightBarController', function($scope, $http, _, formService) {
    
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

    $scope.querySearch = function(query, url, output) {
        return $http.get(url + query + "\"}}")
            .then(function(res) {
                return _.map(res.data, function(item) {
                    return {
                        obj: item,
                        name: item[output.name]
                    };
                });
            });
    };
});