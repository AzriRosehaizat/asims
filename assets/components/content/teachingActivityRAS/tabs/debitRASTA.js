application.service('debitRASTA', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.put('/FCEDebit/' + formData.model.FCEDebitID, formData.model)
                .then(function(res) {
                    res.data.regularStaffID = res.data.regularStaffID.regularStaffID;
                    return res;
                });
        },
        create: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.post('/FCEDebit', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/FCEDebit/' + formData.model.FCEDebitID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'FCE Debit';
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
                name: "FCEDebitType",
                label: "Type"
            }];

            formService.init(formData, gridData, null, 'debitRASTA', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.dateIssued = formService.formatDate(row.entity.dateIssued);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'FCE Debit';
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
                name: "FCEDebitType",
                label: "Type"
            }];

            formService.init(formData, gridData, row, 'debitRASTA', false);
        },
    };
});