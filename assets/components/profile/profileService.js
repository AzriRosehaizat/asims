application.service('profileService', ['$http', '_', 'toaster', function($http, _, toaster) {

    return {
        updateUser: function(user, formData) {
            var self = this;
            formData.mode = 'indeterminate';
            
            $http.put('/user/update/', formData.user)
                .then(function(res) {
                    _.merge(user, res.data);
                    self.resetPasswords(formData);
                    toaster.done("Updated successfully!");
                }, function(err) {
                    toaster.error(err);
                })
                .finally(function() {
                    formData.mode = '';
                });
        },
        cancel: function(formData, user) {
            _.merge(formData.user, user);
            this.resetPasswords(formData);
            formData.form.$setPristine();
            formData.form.$setUntouched();
        },
        resetPasswords: function(formData) {
            formData.user.changePassword = false;
            formData.user.password = '';
            formData.user.passwordConfirm = '';
        },
        initEditForm: function(formData, user) {
            formData.user = _.cloneDeep(user);
            formData.title = user.username;
        }
    };
}]);