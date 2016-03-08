application.service('creditRASTA', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.put('/FCECredit/' + formData.model.FCECreditID, formData.model)
                .then(function(res) {
                    res.data.regularStaffID = res.data.regularStaffID.regularStaffID;
                    return res;
                });
        },
        create: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.post('/FCECredit', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/FCECredit/' + formData.model.FCECreditID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add FCE Credit';
            formData.inputs = [{
                type: "number",
                name: "amount",
                label: "Amount",
                required: true
            }, {
                type: "text",
                name: "description",
                label: "Description"
            }, {
                type: "date",
                name: "dateIssued",
                label: "Date issued"
            }, {
                type: "text",
                name: "FCECreditType",
                label: "Type"
            }];

            formService.init(formData, gridData, null, 'creditRASTA', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.dateIssued = formService.formatDate(row.entity.dateIssued);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit FCE Credit';
            formData.inputs = [{
                type: "number",
                name: "amount",
                label: "Amount",
                required: true
            }, {
                type: "text",
                name: "description",
                label: "Description"
            }, {
                type: "date",
                name: "dateIssued",
                label: "Date issued"
            }, {
                type: "text",
                name: "FCECreditType",
                label: "Type"
            }];

            formService.init(formData, gridData, row, 'creditRASTA', false);
        },
    };
});