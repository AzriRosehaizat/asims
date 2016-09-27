application.service('rsDepartment', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/AcademicStaff_Department/' + formData.model.academicStaffDepartmentID, formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=department&id=' + formData.model.academicStaffID +
                                     '&where=' + res.data.academicStaffDepartmentID);
                });
        },
        create: function(formData) {
            formData.model.academicStaffID = mainRow.entity.academicStaffID;
            return $http.post('/AcademicStaff_Department', formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=department&id=' + formData.model.academicStaffID +
                                     '&where=' + res.data.academicStaffDepartmentID);
                });
        },
        delete: function(formData) {
            return $http.delete('/AcademicStaff_Department/' + formData.model.academicStaffDepartmentID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Department';
            formData.inputs = [{
                type: "autocomplete",
                name: "title",
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
                    from: "title.obj.departmentID",
                    to: "departmentID"
                }],
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start Date"
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                minDate: "startDate"
            }];

            formService.init(formData, gridData, null, 'rsDepartment', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Department';
            formData.inputs = [{
                type: "autocomplete",
                name: "title",
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
                    from: "title.obj.departmentID",
                    to: "departmentID"
                }],
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start Date"
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                minDate: "startDate"
            }];

            formService.init(formData, gridData, row, 'rsDepartment', false);
        },
    };
});
