application.service('dContractStaff', function($http, _, formService) {
    var mainRow;

    return {
        update: function(formData) {
            if (_.isObject(formData.model.fullName)) {
                formData.model.academicStaffID = formData.model.fullName.obj.academicStaffID;
            }
            return $http.put('/AcademicStaff_Department/' + formData.model.academicStaffDepartmentID, formData.model)
                .then(function(res) {
                    return $http.get('/Department/getInfo?type=contractStaff&id=' + res.data.departmentID.departmentID + '&where=' + res.data.academicStaffDepartmentID);
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.fullName)) {
                formData.model.academicStaffID = formData.model.fullName.obj.academicStaffID;
                formData.model.departmentID = mainRow.entity.departmentID;
            }
            console.log(formData.model);
            return $http.post('/AcademicStaff_Department', formData.model)
                .then(function(res) {
                    return $http.get('/Department/getInfo?type=contractStaff&id=' + res.data.departmentID + '&where=' + res.data.academicStaffDepartmentID)
                        .then(function(res2){
                            console.log(res2.data);
                        });
                });
        },
        delete: function(formData) {
            return $http.delete('/AcademicStaff_Department/' + formData.model.academicStaffDepartmentID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Contract Staff';
            formData.inputs = [{
                type: "acCustom",
                name: "fullName",
                label: "Full name",
                url: {
                    start: "/academicStaff/searchFullName?type=ContractStaff&where={",
                    end: "\"fullName\":{\"startsWith\":\"",
                },
                link: "application.contractStaff",
                output: {
                    obj: {},
                    name: "fullName",
                    meta: [{
                        tag: "Employee Num:",
                        name: "employeeNo"
                    }]
                },
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                required: false
            }];

            formService.init(formData, gridData, null, 'dContractStaff', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);
            row.entity.fullName = row.entity.firstName + ' ' + row.entity.lastName;

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Contract Staff';
            formData.inputs = [{
                type: "text",
                name: "fullName",
                label: "Full name",
                readonly: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                required: false
            }];

            formService.init(formData, gridData, row, 'dContractStaff', false);
        },
    };
});