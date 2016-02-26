application.service('adminService', function($http, _, moment, formService) {

    return {
        gridOptions: function() {
            return {
                noUnselect: true,
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
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "firstName",
                label: "First name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                disabled: false,
                required: true
            }, {
                type: "email",
                name: "email",
                label: "Email",
                disabled: false,
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
                disabled: false,
                required: true
            }, {
                type: "password",
                name: "password",
                label: "Password",
                disabled: false,
                minLength: 6
            }, {
                type: "passwordConfirm",
                name: "passwordConfirm",
                label: "Confirm password",
                match: "password",
                disabled: false,
            }];

            formService.init(formData, gridData, null, 'adminService', true);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit User';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                disabled: false,
                required: true
            }, {
                type: "email",
                name: "email",
                label: "Email",
                disabled: false,
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
                disabled: false,
                required: true
            }, {
                type: "passwordChange"
            }, {
                type: "password",
                name: "password",
                label: "Password",
                disabled: false,
                minLength: 6
            }, {
                type: "passwordConfirm",
                name: "passwordConfirm",
                label: "Confirm password",
                match: "password",
                disabled: false,
            }];

            formService.init(formData, gridData, row, 'adminService', true);
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