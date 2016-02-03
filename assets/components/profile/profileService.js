application.service('profileService', function($http, _) {

    return {
        updateUser: function(user, formData) {
            var self = this;
            $http.put('/user/update/', formData.user)
                .then(function(res) {
                    _.merge(user, res.data);
                    self.resetPasswords(formData);
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
        initEditForm: function(user, formData) {
            formData.user = _.cloneDeep(user);
            formData.title = user.username;
        }
    };
});