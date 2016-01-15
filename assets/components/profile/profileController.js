application.controller('profileController', function($scope, $uibModal, CurrentUser) {

    $scope.url = '/user/update/';

    if (!angular.isObject($scope.user)) {
        getUser();
    }

    $scope.openEditModal = function() {
        var modalInstance = $uibModal.open({
            templateUrl: '/components/profile/profileModal.html',
            controller: 'profileModalController',
            resolve: {
                user: function() {
                    return $scope.user;
                },
                url: function() {
                    return $scope.url;
                }
            }
        });

        modalInstance.result.then(function(data) {
            if (angular.isObject(data))
                $scope.user = data;
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