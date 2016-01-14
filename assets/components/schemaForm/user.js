application
    .constant("UserSchema", {
        type: "object",
        properties: {
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
                        enum: [1, 2, 3]
                    }
                }
            }
        },
        required: [
            "email",
            "role.id"
        ]
    })
    .constant("UserForm", [{
        key: "email",
        validationMessage: {
            202: "{{viewValue}} is not a valid email.",
        }
    }, {
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
    }]);