application.service('adminService', function($http, _, moment, formService) {

    return {
        gridOptions: function() {
            return {
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
                    name: 'Last Seen',
                    field: 'lastLogin'
                }],
                minRowsToShow: 20
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
            formData.title = 'User';
            formData.inputs = [{
                type: "text",
                name: "username",
                label: "Username",
                required: true
            }, {
                type: "text",
                name: "firstName",
                label: "First Name",
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last Name",
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
                items: [{
                    id: 1,
                    role: "Reader"
                }, {
                    id: 2,
                    role: "Writer"
                }, {
                    id: 3,
                    role: "Admin"
                }],
                path: "role.role",
                text: "Select a role",
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

            formService.init(formData, gridData, null, 'adminService', true);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'User';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First Name",
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last Name",
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
                items: [{
                    id: 1,
                    role: "Reader"
                }, {
                    id: 2,
                    role: "Writer"
                }, {
                    id: 3,
                    role: "Admin"
                }],
                path: "role.role",
                text: "Select a role",
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

            formService.init(formData, gridData, row, 'adminService', true);
        },
        getLastLogin: function(users) {
            _.forEach(users, function(user) {
                if (user.attempts) {
                    var lastLogin = _.findLast(user.attempts, function(attempt) {
                        return attempt.successful === true;
                    });
                    if (lastLogin) {
                        user.lastLogin = moment(lastLogin.createdAt).fromNow();
                    } else {
                        user.lastLogin = "Never logged in";
                    }
                }
            });
            return users;
        }
    };

    function resetPasswords(formData) {
        formData.model.changePassword = false;
        formData.model.password = '';
        formData.model.passwordConfirm = '';
    }
});