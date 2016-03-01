application.controller('navRightBarController', function($scope, $state, $http, $mdSidenav, _, formService) {

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
                    var result = {
                        obj: item,
                        name: item[output.name]
                    };
                    // For the custom autocomplete template
                    result.meta = (output.meta) ? item[output.meta.name] : null;
                    return result;
                });
            });
    };
    
    $scope.changeValue = function(change) {
        if (change) {
            // Update disabled value from another attribute
            if (change.from && change.to) {
                var value = _.get($scope.fs.formData.model, change.from);
                _.set($scope.fs.formData.model, change.to, value);
            }
            // Reset input value on change of another input
            if (change.reset) {
                _.set($scope.fs.formData.model.searchText, change.reset, undefined);
            }
        }
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