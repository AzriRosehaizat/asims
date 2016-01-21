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
        style: 'btn-danger',
        title: 'Delete',
        onClick: "delete()"
    }]
};

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
        disableSuccessState: true,
        disableErrorState: true,
        readonly: true
    }, {
        key: "firstName",
        condition: "model.switch"
    }, {
        key: "lastName",
        condition: "!model.switch",
        disableSuccessState: true,
        disableErrorState: true,
        readonly: true
    }, {
        key: "lastName",
        condition: "model.switch"
    }, {
        key: "employeeNo",
        condition: "!model.switch",
        disableSuccessState: true,
        disableErrorState: true,
        readonly: true
    }, {
        key: "employeeNo",
        condition: "model.switch"
    }, buttons]);
