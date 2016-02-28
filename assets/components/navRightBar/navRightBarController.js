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
    
    /* 1. Update disabled value from another attribute.
    ** 2. Delete input value on change of another input. */
    $scope.changeValue = function(change) {
        if (change) {
            var value = null;
            
            if (change.from) {
                value = _.get($scope.fs.formData.model, change.from);
            } 
            else {
                _.set($scope.fs.formData.model.searchText, change.to, undefined);
            }
            _.set($scope.fs.formData.model, change.to, value);
        }
    };
});