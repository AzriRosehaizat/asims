application.service('rsDepartment', function($http, $q, _, formService) {

    var parentRow;

    return {
        update: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.departmentID = formData.model.title.obj.departmentID;
            }
            return $http.put('/AcademicStaff_Department/' + formData.model.academicStaffDepartmentID, formData.model)
                .then(function(res) {
                    return $http.get('/Department/' + res.data.departmentID.departmentID)
                        .then(function(department) {
                            res.data.departmentCode = department.data.departmentCode;
                            res.data.title = department.data.title;
                            res.data.departmentID = department.data.departmentID;
                            // Update parent row, more logic?
                            parentRow.entity.departmentCode = res.data.departmentCode;
                            return res;
                        });
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.departmentID = formData.model.title.obj.departmentID;
            }
            formData.model.academicStaffID = parentRow.entity.academicStaffID;
            return $http.post('/AcademicStaff_Department', formData.model)
                .then(function(res) {
                    return $http.get('/Department/' + res.data.departmentID)
                        .then(function(department) {
                            res.data.departmentCode = department.data.departmentCode;
                            res.data.title = department.data.title;
                            // Update parent row, more logic?
                            if (!parentRow.entity.departmentCode)
                                parentRow.entity.departmentCode = res.data.departmentCode;
                            return res;
                        });
                });
        },
        delete: function(formData) {
            return $http.delete('/AcademicStaff_Department/' + formData.model.academicStaffDepartmentID);
        },
        initAddForm: function(formData, gridData, pRow) {
            parentRow = pRow;
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Department';
            formData.inputs = [{
                type: "autocomplete",
                name: "title",
                label: "Name",
                url: "/department?where={\"title\":{\"startsWith\":\"",
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

            formService.setGridData(gridData);
            formService.setFormData(formData, 'rsDepartment');
        },
        initEditForm: function(formData, row, pRow) {
            parentRow = pRow;
            formatDate(row.entity);
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Department';
            formData.inputs = [{
                type: "autocomplete",
                name: "title",
                label: "Name",
                url: "/department?where={\"title\":{\"startsWith\":\"",
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

            formService.setRow(row);
            formService.setFormData(formData, 'rsDepartment');
        },
    };

    function formatDate(entity) {
        entity.startDate = (entity.startDate) ? new Date(entity.startDate) : null;
        entity.endDate = (entity.endDate) ? new Date(entity.endDate) : null;
    }
});