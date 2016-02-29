application.service('loginModalService', function($state, $mdDialog, Auth, toaster) {
    return {
        open: function(ev) {
            return $mdDialog.show({
                controller: 'loginModalController',
                templateUrl: '/components/loginModal/loginModal.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        },
        submit: function(formData) {
            formData.mode = 'indeterminate';

            Auth.login(formData)
                .then(function(res) {
                    toaster.done("Welcome!");
                    $state.go("application.root");
                    $mdDialog.cancel();
                }, function(err) {
                    toaster.error(err);
                })
                .finally(function(notice) {
                    formData.mode = '';
                });
        },
        cancel: function() {
            $mdDialog.cancel();
        }
    };
});
