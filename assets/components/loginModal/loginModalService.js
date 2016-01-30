application.service('loginModalService', function($state, $mdDialog) {
    return {
        open: function(ev) {
            return $mdDialog.show({
                controller: 'loginModalController',
                templateUrl: '/components/loginModal/loginModal.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }
    };
});
