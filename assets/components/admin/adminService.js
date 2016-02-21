application.service('adminService', function($http, _, moment, formService) {

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
        update: function(formData) {
            return $http.put('/user/update/', formData.model)
                .then(function(res) {
                    resetPasswords(formData);
                    return res;
                });
        },
        create: function(formData) {
            return $http.post('/user/create/', formData.model);
        },
        cancel: function(formData) {
            resetPasswords(formData);
        },
        delete: function(formData) {
            return $http.delete('/user/' + formData.model.id);
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add User';
            formData.inputs = [{
                type: "text",
                name: "username",
                label: "Username",
                required: true
            }, {
                type: "text",
                name: "firstName",
                label: "First name",
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                required: true
            }, {
                type: "email",
                name: "email",
                label: "Email",
                required: true
            }, {
                type: "role",
                name: "role",
                label: "Role",
                roles: [{
                    id: 1,
                    role: "Reader"
                }, {
                    id: 2,
                    role: "Writer"
                }, {
                    id: 3,
                    role: "Admin"
                }],
                required: true
            }, {
                type: "password",
                name: "password",
                label: "Password",
                minLength: 6
            }, {
                type: "passwordConfirm",
                name: "passwordConfirm",
                label: "Confirm password",
                match: "password"
            }];

            formService.setGridData(gridData);
            formService.setFormData(formData, 'adminService');
        },
        initEditForm: function(formData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit User';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                required: true
            }, {
                type: "email",
                name: "email",
                label: "Email",
                required: true
            }, {
                type: "role",
                name: "role",
                label: "Role",
                roles: [{
                    id: 1,
                    role: "Reader"
                }, {
                    id: 2,
                    role: "Writer"
                }, {
                    id: 3,
                    role: "Admin"
                }],
                required: true
            }, {
                type: "passwordChange"
            }, {
                type: "password",
                name: "password",
                label: "Password",
                minLength: 6
            }, {
                type: "passwordConfirm",
                name: "passwordConfirm",
                label: "Confirm password",
                match: "password"
            }];
            
            formService.setRow(row);
            formService.setFormData(formData, 'adminService');
        },
        lastLogin: function(row) {
            if (row.entity.attempts) {
                var lastLogin = _.findLast(row.entity.attempts, function(attempt) {
                    return attempt.successful === true;
                });
                if (lastLogin)
                    return moment(lastLogin.createdAt).format('YYYY-MM-DD');
            }
        }
    };

    function resetPasswords(formData) {
        formData.model.changePassword = false;
        formData.model.password = '';
        formData.model.passwordConfirm = '';
    }
});