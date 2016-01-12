application
    .constant("UserSchema", {
        type: "object",
        properties: {
            username: {
                type: "string",
                title: "Name"
            },
            email: {
                type: "string",
                title: "Email",
                pattern: "^\\S+@\\S+$"
            }
        },
        required: [
            "username",
            "email"
        ]
    })
    .constant("UserForm", [
        "username",
        {
            key: "email",
            validationMessage: {
                202: "{{viewValue}} is not a valid email.",
            }
        }
    ]);