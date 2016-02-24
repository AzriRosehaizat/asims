application.service('rsEmployment', function($http, $q, _, formService) {

    var parentRow;

    return {
        update: function(formData) {
            return $http.put('/regularStaffEmployment/' + formData.model.regularEmploymentID, formData.model);
        },
        create: function(formData) {
            formData.model.regularStaffID = parentRow.entity.regularStaffID;
            return $http.post('/regularStaffEmployment/', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/regularStaffEmployment/' + formData.model.regularEmploymentID);
        },
        initAddForm: function(formData, gridData, pRow) {
            parentRow = pRow;
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Employement';
            formData.inputs = [{
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
            formService.setFormData(formData, 'rsEmployment');
        },
        initEditForm: function(formData, row, pRow) {
            parentRow = pRow;
            formService.formatDate(row.entity.startDate);
            formService.formatDate(row.entity.endDate);
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Employment';
            formData.inputs = [{
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
            formService.setFormData(formData, 'rsEmployment');
        },
    };
});