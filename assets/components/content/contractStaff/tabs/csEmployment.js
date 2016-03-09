application.service('csEmployment', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/contractStaffEmployment/' + formData.model.contractEmploymentID, formData.model);
        },
        create: function(formData) {
            formData.model.contractStaffID = mainRow.entity.contractStaffID;
            return $http.post('/contractStaffEmployment/', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/contractStaffEmployment/' + formData.model.contractEmploymentID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;
            
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Employment';
            formData.inputs = [{
                type: "date",
                name: "startDate",
                label: "Start Date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                minDate: "startDate"
            }];
            
            formService.init(formData, gridData, null, 'csEmployment', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Employment';
            formData.inputs = [{
                type: "date",
                name: "startDate",
                label: "Start Date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                minDate: "startDate"
            }];
            
            formService.init(formData, gridData, row, 'csEmployment', false);
        },
    };
});