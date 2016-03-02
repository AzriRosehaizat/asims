application.service('rGrant', function($http, _, formService) {
    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/researchGrant/' + formData.model.grantID, formData.model)
                .then(function(res) {
                    res.data.researchID = res.data.researchID.researchID;
                    return res;
                });
        },
        create: function(formData) {
            formData.model.researchID = mainRow.entity.researchID;
            return $http.post('/researchGrant/', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/researchGrant/' + formData.model.grantID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Grant';
            formData.inputs = [{
                type: "text",
                name: "grantingAgency",
                label: "Name",
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "dateAwarded",
                label: "Date Awarded",
                disabled: false,
                required: false
            }, {
                type: "text",
                name: "duration",
                label: "Duration",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, null, 'rGrant', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.dateAwarded = formService.formatDate(row.entity.dateAwarded);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Grant';
            formData.inputs = [{
                type: "text",
                name: "grantingAgency",
                label: "Granting Agency",
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "dateAwarded",
                label: "Date Awarded",
                disabled: false,
                required: false
            }, {
                type: "text",
                name: "duration",
                label: "Duration",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, row, 'rGrant', false);
        },
    };
});