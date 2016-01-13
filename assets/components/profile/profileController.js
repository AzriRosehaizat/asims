application.controller('profileController', function($scope, $uibModal, CurrentUser) {

    if ($scope.user === undefined) {
        getUser();
    }

    $scope.openEditModal = function() {
        var modalInstance = $uibModal.open({
            templateUrl: '/components/profile/profileModal.html',
            controller: 'profileModalController',
            resolve: {
                user: function() {
                    return $scope.user;
                }
            }
        });

        modalInstance.result.then(function(updatedUser) {
            $scope.user = updatedUser
        }, function(err) {
            console.log(err);
        });
    };

    function getUser() {
        CurrentUser.getUser()
            .then(function(data) {
                $scope.user = data;
            }, function(err) {
                console.warn(err);
            });
    }
});