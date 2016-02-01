application.service('loginModalService', function($state, $uibModal) {
    return {
        open: function() {
            return $uibModal.open({
                templateUrl: '/components/loginModal/loginModal.html',
                controller: 'loginModalController',
                size: 'sm'
            });
        }
    };
});
