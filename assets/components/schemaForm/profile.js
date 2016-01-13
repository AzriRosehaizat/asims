application
    .constant("ProfileSchema", {
        type: "object",
        properties: {
            "email": {
                type: "string",
                title: "Email",
                pattern: "^\\S+@\\S+$"
            }
        },
        required: [
            "email"
        ]
    })
    .constant("ProfileForm", [
        {
            key: "email",
            validationMessage: {
                202: "{{viewValue}} is not a valid email.",
            }
        }
    ]);