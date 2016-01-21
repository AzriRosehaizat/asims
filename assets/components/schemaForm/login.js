application
    .constant("LoginSchema", {
        type: "object",
        properties: {
            "username": {
                type: "string",
                title: "Username",
            },
            "password": {
                type: "string",
                title: "Password"
            }
        },
        required: [
            "username",
            "password"
        ]
    })
    .constant("LoginForm", [
        "username", {
            key: "password",
            type: "password"
        }, {
            type: "submit",
            style: "btn-primary",
            title: "Submit"
        }
    ]);