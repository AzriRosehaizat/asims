var email = {
    key: "email",
    validationMessage: {
        202: "{{viewValue}} is not a valid email.",
    }
};
var role = {
    key: "role.id",
    type: "select",
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
            "email",
            "password"
        ]
    })
    .constant("AddUserForm", ["username", email, role, {key: "password", type: "password"}])
    .constant("EditUserForm", [email, role])
    .constant("ProfileForm", [email]);
