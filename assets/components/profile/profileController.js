application.controller('profileController', function($scope, $http, CurrentUser) {

    $scope.user = {
        id: CurrentUser.user().id,
        username: CurrentUser.user().username,
        email: CurrentUser.user().email
    };
    
    $scope.checkEmail = function(data) {
        // some validation here
    };

    $scope.updateUser = function() {
        // $scope.user already updated!
        return $http.put('/user/update', $scope.user)
        .success(function(res) {
            // save modified user values to local storage
            CurrentUser.update(res[0].email);
        })
        .error(function(err) {
            if (err.field && err.msg) {
                // err like {field: "name", msg: "Server-side error for this username!"} 
                $scope.editableForm.$setError(err.field, err.msg);
            }
            else {
                // unknown error
                $scope.editableForm.$setError('name', 'Unknown error!');
            }
        });
    };
});