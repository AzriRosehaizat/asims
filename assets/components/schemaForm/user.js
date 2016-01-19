var username = {
    key: "username",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true
};
var email = {
    key: "email",
    condition: "model.switch",
    validationMessage: {
        202: "{{viewValue}} is not a valid email.",
    }
};
var emailReadOnly = {
    key: "email",
    condition: "!model.switch",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true
};
var role = {
    key: "role.id",
    type: "select",
    condition: "model.switch",
    titleMap: [{
        value: 1,
        name: "reader"
    }, {
        value: 2,
        name: "writer"
    }, {
        value: 3,
        name: "admin"
    }]
};
var roleReadOnly = {
    key: "role.id",
    type: "select",
    condition: "!model.switch",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true,
    titleMap: [{
        value: 1,
        name: "reader"
    }, {
        value: 2,
        name: "writer"
    }, {
        value: 3,
        name: "admin"
    }]
};
var roleReadOnlyNoCondition = {
    key: "role.id",
    type: "select",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true,
    titleMap: [{
        value: 1,
        name: "reader"
    }, {
        value: 2,
        name: "writer"
    }, {
        value: 3,
        name: "admin"
    }]
};
var buttons = {
    type: "actions",
    condition: "model.switch",
    items: [{
        type: 'submit',
        style: 'btn-success',
        title: 'Save'
    }, {
        type: 'button',
        style: 'btn-info',
        title: 'Cancel',
        onClick: "cancel()"
    }, {
        type: 'button',
        style: 'btn-danger pull-right',
        title: 'Delete',
        onClick: "delete()"
    }]
};

application
    .constant("UserSchema", {
        type: "object",
        properties: {
            "username": {
                type: "string",
                title: "Username",
            },
            "email": {
                type: "string",
                title: "Email",
                pattern: "^\\S+@\\S+$"
            },
            "role": {
                type: "object",
                properties: {
                    "id": {
                        type: "integer",
                        title: "Role",
                        enum: [1, 2, 3],
                        required: true
                    }
                }
            },
            "password": {
                type: "string",
                title: "Password",
                minLength: 6
            }
        },
        required: [
            "username",
            "password"
        ]
    })
    .constant("AddUserForm", ["username", email, role, {
        key: "password",
        type: "password"
    }])
    .constant("EditUserForm", [username, emailReadOnly, email, roleReadOnly, role, buttons])
    .constant("ProfileForm", [username, emailReadOnly, email, roleReadOnlyNoCondition, buttons]);
