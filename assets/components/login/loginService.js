application.service('loginService', ['$state', 'Auth', 'toaster', function($state, Auth, toaster) {
    return {
        submit: function(formData) {
            formData.mode = 'indeterminate';

            Auth.login(formData)
                .then(function(res) {
                    toaster.done("Welcome!");
                    $state.go("application.root");
                }, function(err) {
                    toaster.loginError(err);
                })
                .finally(function(notice) {
                    formData.mode = '';
                });
        }
    };
}]);
