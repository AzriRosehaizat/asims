application.service('loginService', function($state, Auth, toaster) {
    return {
        submit: function(formData) {
            formData.mode = 'indeterminate';

            Auth.login(formData)
                .then(function(res) {
                    toaster.done("Welcome!");
                    $state.go("application.root");
                }, function(err) {
                    toaster.error(err);
                })
                .finally(function(notice) {
                    formData.mode = '';
                });
        }
    };
});
