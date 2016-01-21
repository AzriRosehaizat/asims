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
        }
    })
    .constant("LoginForm", [
        "username", {
            key: "password",
            type: "password"
        }, {
            type: "submit",
            style: "btn-primary",
            title: "Log in"
        }
    ]);