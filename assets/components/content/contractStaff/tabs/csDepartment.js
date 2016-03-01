application.service('csDepartment', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.departmentID = formData.model.title.obj.departmentID;
            }
            return $http.put('/AcademicStaff_Department/' + formData.model.academicStaffDepartmentID, formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=department&id=' + formData.model.academicStaffID +
                                     '&where=' + res.data.academicStaffDepartmentID);
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.departmentID = formData.model.title.obj.departmentID;
            }
            formData.model.academicStaffID = mainRow.entity.academicStaffID;

            return $http.post('/AcademicStaff_Department', formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=department&id=' + formData.model.academicStaffID +
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
            formData.title = 'Add Department';
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
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, null, 'csDepartment', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Department';
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
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, row, 'csDepartment', false);
        },
    };
});