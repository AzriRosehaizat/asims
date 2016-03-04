application.service('dRegularStaff', function($http, _, formService) {
    var mainRow;

    return {
        update: function(formData) {
            if (_.isObject(formData.model.fullName)) {
                formData.model.academicStaffID = formData.model.fullName.obj.academicStaffID;
            }
            return $http.put('/AcademicStaff_Department/' + formData.model.academicStaffDepartmentID, formData.model)
                .then(function(res) {
                    return $http.get('/department/getInfo?type=regularStaff&id=' + res.data.departmentID.departmentID + '&where=' + res.data.academicStaffDepartmentID);
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.fullName)) {
                formData.model.academicStaffID = formData.model.fullName.obj.academicStaffID;
                formData.model.departmentID = mainRow.entity.departmentID;
            }
            return $http.post('/AcademicStaff_Department', formData.model)
                .then(function(res) {
                    return $http.get('/department/getInfo?type=regularStaff&id=' + res.data.departmentID + '&where=' + res.data.academicStaffDepartmentID);
                });
        },
        delete: function(formData) {
            return $http.delete('/AcademicStaff_Department/' + formData.model.academicStaffDepartmentID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Regular Staff';
            formData.inputs = [{
                type: "acCustom",
                name: "fullName",
                label: "Full name",
                url: {
                    start: "/academicStaff/searchFullName?type=RegularStaff&where={",
                    end: "\"fullName\":{\"startsWith\":\"",
                },
                link: "application.regularStaff",
                output: {
                    obj: {},
                    name: "fullName",
                    meta: [{
                        tag: "",
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

            formService.init(formData, gridData, null, 'dRegularStaff', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);
            row.entity.fullName = row.entity.firstName + ' ' + row.entity.lastName;

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Regular Staff';
            formData.inputs = [{
                type: "acCustom",
                name: "fullName",
                label: "Full name",
                url: {
                    start: "/academicStaff/searchFullName?type=RegularStaff&where={",
                    end: "\"fullName\":{\"startsWith\":\"",
                },
                link: "application.regularStaff",
                output: {
                    obj: {},
                    name: "fullName",
                    meta: [{
                        tag: "",
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

            formService.init(formData, gridData, row, 'dRegularStaff', false);
        },
    };
});