application.controller('navRightBarController', function($scope, $state, $http, _, formService) {

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
        var query = url.start;
            if (url.where) {
                _.forEach(url.where, function(where) {
                    var value = _.get($scope.fs.formData.model, where.value);
                    query += "\"" + where.key + "\":\"" + value + "\",";
                });
            }
            query += url.end + searchText + "\"}}";
            // console.log(query);

        return $http.get(query)
            .then(function(res) {
                return _.map(res.data, function(item) {
                    return {
                        obj: item,
                        name: item[output.name]
                    };
                });
            });
    };

    /* For ng-disabled */
    $scope.isObject = function(value) {
        var modelAttr = $scope.fs.formData.model[value];
        return _.isObject(modelAttr);
    };

    /* To change disabled value copying from another attribute */
    $scope.copyValue = function(copy) {
        if (copy) {
            var value = _.get($scope.fs.formData.model, copy.from);
            _.set($scope.fs.formData.model, copy.to, value);
        }
    };
});