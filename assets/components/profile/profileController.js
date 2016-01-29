application.controller('profileController', function($scope, $http, _, user) {
    
    $scope.user = user.data;
    $scope.formData = _.cloneDeep($scope.user);
    $scope.detailTitle = $scope.user.username;
    resetPasswords();

    $scope.submit = function() {
        console.log($scope.formData);
        $http.put('/user/update/', $scope.formData)
            .then(function(res) {
                _.merge($scope.user, res.data);
                resetPasswords();
            }, function(err) {
                console.warn(err);
            });
    };

    $scope.cancel = function(form) {
        _.merge($scope.formData, $scope.user);
        resetPasswords();
        // remove errors
        form.$setUntouched();
    };
    
    function resetPasswords() {
        $scope.formData.changePassword = false;
        $scope.formData.password = '';
        $scope.formData.passwordConfirm = '';
    }
});