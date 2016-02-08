application.service('adminService', function($http, $mdDialog, _, moment, toaster) {

    return {
        gridOptions: function() {
            return {
                multiSelect: false,
                enableRowHeaderSelection: false,
                enableHorizontalScrollbar: 0,
                columnDefs: [{
                    name: 'Username',
                    field: 'username'
                }, {
                    name: 'First name',
                    field: 'firstName'
                }, {
                    name: 'Last name',
                    field: 'lastName'
                }, {
                    name: 'Email',
                    field: 'email'
                }, {
                    name: 'Role',
                    field: 'role.role'
                }, {
                    name: 'Last login',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.lastLogin(row)}}</div>'
                }]
            };
        },
        updateUser: function(row, formData) {
            var self = this;
            formData.mode = 'indeterminate';
            
            $http.put('/user/update/', formData.user)
                .then(function(res) {
                    _.merge(row.entity, res.data);
                    self.resetPasswords(formData);
                    toaster.open("Updated successfully!");
                }, function(err) {
                    toaster.open(err);
                })
                .finally(function(notice) {
                    formData.mode = '';
                });
        },
        createUser: function(gridData, formData) {
            var self = this;
            formData.mode = 'indeterminate';
            
            $http.post('/user/create/', formData.user)
                .then(function(res) {
                    gridData.push(res.data);
                    formData.user = {};
                    self.resetValidation(formData);
                    toaster.open("Added successfully!");
                }, function(err) {
                    toaster.open(err);
                })
                .finally(function(notice) {
                    formData.mode = '';
                });
        },
        cancel: function(row, formData) {
            if (formData.isEditing) {
                _.merge(formData.user, row.entity);
                this.resetPasswords(formData);
            }
            else {
                formData.user = {};
            }
            this.resetValidation(formData);
        },
        delete: function(ev, gridData, formData) {
            var self = this;
            var confirm = $mdDialog.confirm()
                .title('You are deleting ' + formData.user.username)
                .textContent('Are you sure?')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                var index = gridData.indexOf(formData.user);
                formData.mode = 'indeterminate';
                
                $http.delete('/user/' + formData.user.id)
                    .then(function(res) {
                        gridData.splice(index, 1);  // delete the row in ui-grid
                        self.initAddForm(formData);
                        self.resetValidation(formData);  // because the form gives ugly errors...
                        toaster.open("Deleted successfully!");
                    }, function(err) {
                        toaster.open(err);
                    })
                    .finally(function(notice) {
                        formData.mode = '';
                    });
            });
        },
        lastLogin: function(row) {
            if (row.entity.attempts) {
                var lastLogin = _.findLast(row.entity.attempts, function(attempt) {
                    return attempt.successful === true;
                });
                if (lastLogin)
                    return moment(lastLogin.createdAt).format('YYYY-MM-DD');
            }
        },
        resetValidation: function(formData) {
            formData.form.$setPristine();
            formData.form.$setUntouched();
        },
        resetPasswords: function(formData) {
            formData.user.changePassword = false;
            formData.user.password = '';
            formData.user.passwordConfirm = '';
        },
        initAddForm: function(formData) {
            formData.user = {};
            formData.isEditing = false;
            formData.title = 'Add a User';
        },
        initEditForm: function(formData, row) {
            formData.user = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit a User';
        }
    };
});