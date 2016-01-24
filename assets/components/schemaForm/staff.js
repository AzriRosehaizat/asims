var firstName = {
    key: "firstName",
    condition: "model.switch"
};
var firstNameRO = {
    key: "firstName",
    condition: "!model.switch",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true
};
var lastName = {
    key: "lastName",
    condition: "model.switch"
};
var lastNameRO = {
    key: "lastName",
    condition: "!model.switch",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true
};
var employeeNo = {
    key: "employeeNo",
    condition: "model.switch"
};
var employeeNoRO = {
    key: "employeeNo",
    condition: "!model.switch",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true
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
        style: 'btn-danger',
        title: 'Delete',
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
var addTitle = {
    type: "help",
    helpvalue: "<h3>Add a staff</h3>"
};
var editTitle = {
    type: "help",
    helpvalue: "<h3>Edit a staff</h3>"
};

application
    .constant("StaffSchema", {
        type: "object",
        properties: {
            "firstName": {
                type: "string",
                title: "First Name",
                required: true
            },
            "lastName": {
                type: "string",
                title: "Last Name",
                required: true
            },
            "employeeNo": {
                type: "string",
                title: "Employee No",
                required: true
            }
        }
    })
    .constant("AddStaffForm", [addTitle, firstName, lastName,
        employeeNo, buttonsNoDelete
    ])
    .constant("EditStaffForm", [editTitle, firstNameRO, firstName,
        lastNameRO, lastName, employeeNoRO, employeeNo, buttons
    ]);