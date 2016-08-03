application.service('regularStaffService', ['$http', '_', 'formService', function($http, _, formService) {

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
            return $http.post('/regularStaff/createRAS', formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getAllRegularStaff/' + res.data.regularStaffID);
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
                type: "autocomplete",
                name: "department",
                label: "Department",
                url: {
                    start: "/department?where={",
                    end: "\"title\":{\"startsWith\":\""
                },
                link: "application.department",
                output: {
                    obj: {},
                    name: "title"
                },
                assign: [{
                    from: "department.obj.departmentID",
                    to: "deptID"
                }],
                reset: ["rank", "rankID"]
            }, {
                type: "date",
                name: "deptStartDate",
                label: "Dept. Start Date",
                hide: "fs.form.department.$pristine",
                required: "fs.form.department.$dirty"
            }, {
                type: "date",
                name: "deptEndDate",
                label: "Dept. End Date",
                minDate: "deptStartDate",
                hide: "fs.form.department.$pristine"
            }, {
                type: "autocomplete",
                name: "rank",
                label: "Rank",
                url: {
                    start: "/rank?where={",
                    end: "\"title\":{\"startsWith\":\""
                },
                link: "application.rank",
                output: {
                    obj: {},
                    name: "title"
                },
                assign: [{
                    from: "rank.obj.rankID",
                    to: "rankID"
                }],
                disabled: "!fs.formData.model.deptID"
            }, {
                type: "date",
                name: "rankStartDate",
                label: "Rank Start Date",
                hide: "fs.form.rank.$pristine"
            }, {
                type: "date",
                name: "rankEndDate",
                label: "Rank End Date",
                minDate: "rankStartDate",
                hide: "fs.form.rank.$pristine"
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
}]);