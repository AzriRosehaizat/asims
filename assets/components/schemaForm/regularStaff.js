var firstName = {
    key: "academicStaffID.firstName",
    condition: "model.switch"
};
var firstNameRO = {
    key: "academicStaffID.firstName",
    condition: "!model.switch",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true
};
var lastName = {
    key: "academicStaffID.lastName",
    condition: "model.switch"
};
var lastNameRO = {
    key: "academicStaffID.lastName",
    condition: "!model.switch",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true
};
var employeeNo = {
    key: "academicStaffID.employeeNo",
    condition: "model.switch"
};
var employeeNoRO = {
    key: "academicStaffID.employeeNo",
    condition: "!model.switch",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true
};
var tenureDate = {
    key: "tenureDate",
    condition: "model.switch"
};
var tenureDateRO = {
    key: "tenureDate",
    condition: "!model.switch",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true
};
var contApptDate = {
    key: "contApptDate",
    condition: "model.switch"
};
var contApptDateRO = {
    key: "contApptDate",
    condition: "!model.switch",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true
};
var startDate = {
    key: "startDate",
    condition: "model.switch"
};
var startDateRO = {
    key: "startDate",
    condition: "!model.switch",
    disableSuccessState: true,
    disableErrorState: true,
    readonly: true
};
var endDate = {
    key: "endDate",
    condition: "model.switch"
};
var endDateRO = {
    key: "endDate",
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
    .constant("RegularStaffSchema", {
        type: "object",
        properties: {
            "academicStaffID": {
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
                }
            },
            "tenureDate": {
                type: "string",
                title: "Tenure Date"
            },
            "contApptDate": {
                type: "string",
                title: "Cont Appt Date"
            },
            "startDate": {
                type: "string",
                title: "Start Date"
            },
            "endDate": {
                type: "string",
                title: "End Date"
            }
        },
        required: [
            "firstName",
            "lastName",
            "employeeNo"
        ]
    })
    .constant("AddRegularStaffForm", [addTitle, firstName, lastName, employeeNo,
        tenureDate, contApptDate, startDate, endDate, buttonsNoDelete
    ])
    .constant("EditRegularStaffForm", [editTitle, firstNameRO, firstName,
        lastNameRO, lastName, employeeNoRO, employeeNo, tenureDateRO, tenureDate,
        contApptDateRO, contApptDate, startDateRO, startDate, endDateRO, endDate,
        buttons
    ]);
