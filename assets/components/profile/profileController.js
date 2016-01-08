application.controller('profileController', function($scope, $http, CurrentUser) {
    
    $scope.user = {
        id: CurrentUser.user().id,
        username: CurrentUser.user().username,
        email: CurrentUser.user().email
    };
    
    $scope.checkEmail = function(data) {
        // some validation here...
    };
    
    // keep a copy of user in case of errors
    $scope.copyUser = function() {
        $scope.userCopy = angular.copy($scope.user);
    };

    $scope.updateUser = function() {
        // $scope.user already updated!
        return $http.put('/user/update', $scope.user)
        // .then().catch() doesn't work with xeditable form
        .success(function(res) {
            // save the updated user object to local storage
            CurrentUser.update(res);  
            $scope.copyUser();
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
    
    $scope.restoreUser = function() {
        $scope.user = $scope.userCopy;
    }
});