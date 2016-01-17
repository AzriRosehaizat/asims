application
    .constant("StaffSchema", {
        type: "object",
        properties: {
            "firstName": {
                type: "string",
                title: "First Name"
            },
            "lastName": {
                type: "string",
                title: "Last Name"
            },
            "employeeNo": {
                type: "string",
                title: "Employee No"
            }
        },
        required: [
            "firstName",
            "lastName",
            "employeeNo"
        ]
    })
    .constant("EditStaffForm", [{
        key: "firstName",
        condition: "!model.switch",
        readonly: true
    }, {
        key: "firstName",
        condition: "model.switch"
    }, {
        key: "lastName",
        condition: "!model.switch",
        readonly: true
    }, {
        key: "lastName",
        condition: "model.switch"
    }, {
        key: "employeeNo",
        condition: "!model.switch",
        readonly: true
    }, {
        key: "employeeNo",
        condition: "model.switch"
    }]);
