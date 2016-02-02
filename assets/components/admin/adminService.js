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
            return $http.put('/user/update/', formData.user)
                .then(function(res) {
                    _.merge(row.entity, res.data);
                    self.resetPasswords(formData);
                    return res.data;
                });
        },
        createUser: function(gridData, formData) {
            return $http.post('/user/create/', formData.user)
                .then(function(res) {
                    gridData.push(res.data);
                    formData.user = {};
                    return res.data;
                });
        },
        cancel: function(row, formData, isEditing) {
            if (isEditing) {
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
                // get index before $http request to prevent user from 
                // deleting a row that is selected during the request.
                var index = gridData.indexOf(formData.user);
                $http.delete('/user/' + formData.user.id)
                    .then(function(res) {
                        gridData.splice(index, 1);
                        self.initAddForm(formData);
                        return res.data;
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
        },
        initEditForm: function(row, formData) {
            formData.user = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit a User';
        }
    };
});