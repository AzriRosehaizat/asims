application.service('regularStaffService', function($http, _, formService) {

    return {
        gridOptions: function() {
            return {
                columnDefs: [{
                    name: 'First Name',
                    field: 'firstName'
                }, {
                    name: 'Last Name',
                    field: 'lastName'
                }, {
                    name: 'Employee No.',
                    field: 'employeeNo'
                }, {
                    name: 'Department',
                    field: 'departmentCode'
                }, {
                    name: 'Rank',
                    field: 'rank'
                }, {
                    name: 'Tenure Date',
                    field: 'tenureDate',
                    cellFilter: 'date:\'MM-dd-yyyy\''
                }, {
                    name: 'Continuing Appt. Date',
                    field: 'contAppDate',
                    cellFilter: 'date:\'MM-dd-yyyy\''
                }]
            };
        },
        //really we should be checking if data is dirty, then update appropriately
        //this seems slower, but negligible for our efforts 
        update: function(formData) {
            return $http.put('/academicStaff/' + formData.model.academicStaffID, formData.model)
                .then(function(aStaff) {
                    return $http.put('/regularStaff/' + formData.model.regularStaffID, formData.model)
                        .then(function(rStaff) {
                            return $http.get('/regularStaff/getAllRegularStaff/' + rStaff.data.regularStaffID);
                        });
                });
        },
        create: function(formData) {
            return $http.post('/academicStaff', formData.model)
                .then(function(aStaff) {
                    // retrieve newly created academicStaffID
                    formData.model.academicStaffID = aStaff.data.academicStaffID;
                    return $http.post('/regularStaff', formData.model)
                        .then(function(rStaff) {
                            return $http.get('/regularStaff/getAllRegularStaff/' + rStaff.data.regularStaffID);
                        });
                });
        },
        delete: function(formData) {
            return $http.delete('/regularStaff/' + formData.model.regularStaffID)
                .then(function(res) {
                    return $http.delete('/academicStaff/' + formData.model.academicStaffID);
                });
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Regular Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First Name",
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last Name",
                required: true
            }, {
                type: "text",
                name: "employeeNo",
                label: "Employee No."
            }, {
                type: "date",
                name: "tenureDate",
                label: "Tenure Date"
            }, {
                type: "date",
                name: "contAppDate",
                label: "Continuing Appt. Date"
            }];

            formService.init(formData, gridData, null, 'regularStaffService', true);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.tenureDate = formService.formatDate(row.entity.tenureDate);
            row.entity.contAppDate = formService.formatDate(row.entity.contAppDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Regular Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First Name",
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last Name",
                required: true
            }, {
                type: "text",
                name: "employeeNo",
                label: "Employee No."
            }, {
                type: "date",
                name: "tenureDate",
                label: "Tenure Date"
            }, {
                type: "date",
                name: "contAppDate",
                label: "Continuing Appt. Date"
            }];

            formService.init(formData, gridData, row, 'regularStaffService', true);
        },
        getRow: function(row) {
            return $http.get('/regularStaff/getAllRegularStaff/' + row.entity.regularStaffID);
        }
    };
});