application.service('rsDepartment', function($http, $q, _, formService) {

    return {
        update: function(formData) {
            console.log(formData.model);
            return $http.put('/AcademicStaff_Department/' + formData.model.academicStaffDepartmentID, formData.model);
        },
        create: function(formData) {
            return $q.when(true);
            // return $http.post('/AcademicStaff_Department', formData.model);
        },
        delete: function(formData) {
            return $q.when(true);
            // return $http.delete('/AcademicStaff_Department', formData.model);
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Department';
            formData.inputs = [{
                type: "autocomplete",
                name: "title",
                label: "Name",
                url: "/department?where={\"title\":{\"startsWith\":\"",
                link: "application.department",
                output: {id: "departmentID", name: "title"},
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
        initEditForm: function(formData, row) {
            formatDate(row.entity);
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Department';
            formData.inputs = [{
                type: "text",
                name: "departmentCode",
                label: "Code",
                disabled: true,
                required: true
            }, {
                type: "autocomplete",
                name: "title",
                label: "Name",
                url: "/department?where={\"title\":{\"startsWith\":\"",
                link: "application.department",
                output: {id: "departmentID", name: "title"},
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