application.service('rsEmployment', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/regularStaffEmployment/' + formData.model.regularEmploymentID, formData.model);
        },
        create: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.post('/regularStaffEmployment/', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/regularStaffEmployment/' + formData.model.regularEmploymentID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;
            
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Employment';
            formData.inputs = [{
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date"
            }];
            
            formService.init(formData, gridData, null, 'rsEmployment', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Employment';
            formData.inputs = [{
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date"
            }];
            
            formService.init(formData, gridData, row, 'rsEmployment', false);
        },
    };
});