application.service('adminService', function($http, $mdDialog, _, moment) {

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
            formData.submit = 'indeterminate';
            return $http.put('/user/update/', formData.user)
                .then(function(res) {
                    _.merge(row.entity, res.data);
                    self.resetPasswords(formData);
                    return res.data;
                })
                .finally(function(notice) {
                    formData.submit = '';
                });
        },
        createUser: function(gridData, formData) {
            formData.submit = 'indeterminate';
            return $http.post('/user/create/', formData.user)
                .then(function(res) {
                    gridData.push(res.data);
                    formData.user = {};
                    return res.data;
                })
                .finally(function(notice) {
                    formData.submit = '';
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
            formData.form.$setPristine();
            formData.form.$setUntouched();
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
                formData.delete = 'indeterminate';
                // get index before $http request to prevent user from 
                // deleting a row that is selected during the request.
                var index = gridData.indexOf(formData.user);
                $http.delete('/user/' + formData.user.id)
                    .then(function(res) {
                        gridData.splice(index, 1);
                        self.initAddForm(formData);
                        return res.data;
                    })
                    .finally(function(notice) {
                        formData.delete = '';
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
        resetPasswords: function(formData) {
            formData.user.changePassword = false;
            formData.user.password = '';
            formData.user.passwordConfirm = '';
        },
        initAddForm: function(formData) {
            formData.user = {};
            formData.isEditing = false;
            formData.title = 'Add a User';
            formData.submit = '';
            formData.delete = '';
        },
        initEditForm: function(row, formData) {
            formData.user = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit a User';
        }
    };
});