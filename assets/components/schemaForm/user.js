var username = {
    key: "username",
    condition: "model.switch"
};
var usernameReadOnly = {
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
    type: "radiobuttons",
    condition: "model.switch",
    style: {
        selected: "btn-success",
        unselected: "btn-default"
    },
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
    type: "radiobuttons",
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
var roleReadOnlyProfile = {
    key: "role.role",
    type: "string",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true
};
var passwords = {
    type: "section",
    condition: "model.switch",
    items: [{
        key: "password",
        type: "password"

    }, {
        key: "password_confirm",
        type: "password"
    }]
};
var passwordsInEdit = {
    type: "section",
    condition: "model.switch && model.changePassword",
    items: [{
        key: "password",
        type: "password"

    }, {
        key: "password_confirm",
        type: "password"
    }]
};
var buttons = {
    type: "actions",
    condition: "model.switch",
    items: [{
        type: "submit",
        style: "btn-success",
        title: "Save"
    }, {
        type: "button",
        style: "btn-info",
        title: "Cancel",
        onClick: "cancel()"
    }, {
        type: "button",
        style: "btn-danger",
        title: "Delete",
        onClick: "delete()"
    }]
};
var buttonsNoDelete = {
    type: "actions",
    condition: "model.switch",
    items: [{
        type: "submit",
        style: "btn-success",
        title: "Save"
    }, {
        type: "button",
        style: "btn-info",
        title: "Cancel",
        onClick: "cancel()"
    }]
};
var toggleButton = {
    key: "switch",
    type: "radiobuttons",
    notitle: true,
    style: {
        name: "toggleButton",
        selected: "btn-primary btn-xs",
        unselected: "btn-default btn-xs"
    },
    titleMap: [{
        value: true,
        name: "Open"
    }, {
        value: false,
        name: "Close"
    }]
};
var addTitle = {
    type: "help",
    helpvalue: "<h3>Add a user</h3><br>"
};
var editTitle = {
    type: "help",
    helpvalue: "<h3>Edit a user</h3><br>"
};
var profileTitle = {
    type: "help",
    helpvalue: "<h3>Profile</h3><br>"
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
                    },
                    "role": {
                        type: "string",
                        title: "Role"
                    }
                }
            },
            "password": {
                type: "string",
                title: "Password",
                minLength: 6
            },
            "password_confirm": {
                type: "string",
                title: "Confirm password",
                minLength: 6
            },
            "changePassword": {
                type: "boolean",
                title: "Change password?",
                default: false
            },
            "switch": {
                type: "boolean",
                default: false
            }
        },
        required: [
            "username",
            "password",
            "password_confirm"
        ]
    })
    .constant("AddUserForm", [toggleButton, addTitle, username, email, role, passwords, buttonsNoDelete])
    .constant("EditUserForm", [toggleButton, editTitle, usernameReadOnly, emailReadOnly, email, roleReadOnly, role, "changePassword", passwordsInEdit, buttons])
    .constant("ProfileForm", [toggleButton, profileTitle, usernameReadOnly, emailReadOnly, email, roleReadOnlyProfile, buttonsNoDelete]);
