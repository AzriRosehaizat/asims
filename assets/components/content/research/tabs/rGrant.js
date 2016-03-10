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
            formData.title = 'Grant';
            formData.inputs = [{
                type: "text",
                name: "grantingAgency",
                label: "Granting Agency",
                required: true
            }, {
                type: "date",
                name: "dateAwarded",
                label: "Date Awarded"
            }, {
                type: "text",
                name: "duration",
                label: "Duration (In Years)"
            }, {
                type: "currency",
                name: "amount",
                label: "Amount (CAD)"
            }];

            formService.init(formData, gridData, null, 'rGrant', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.dateAwarded = formService.formatDate(row.entity.dateAwarded);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Grant';
            formData.inputs = [{
                type: "text",
                name: "grantingAgency",
                label: "Granting Agency",
                required: true
            }, {
                type: "date",
                name: "dateAwarded",
                label: "Date Awarded"
            }, {
                type: "text",
                name: "duration",
                label: "Duration (In Years)"
            }, {
                type: "currency",
                name: "amount",
                label: "Amount (CAD)"
            }];

            formService.init(formData, gridData, row, 'rGrant', false);
        },
    };
});