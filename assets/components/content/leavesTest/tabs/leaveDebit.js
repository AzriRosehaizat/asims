application.service('leaveDebit', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/LeaveDebit/' + formData.model.leaveDebitID, formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=leaveDebits&id=' + res.data.regularStaffID.regularStaffID +
                                     '&where=' + res.data.leaveDebitID);
                });
        },
        create: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.post('/LeaveDebit', formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=leaveDebits&id=' + res.data.regularStaffID +
                                     '&where=' + res.data.leaveDebitID);
                });
        },
        delete: function(formData) {
            return $http.delete('/LeaveDebit/' + formData.model.leaveDebitID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Leave Debit';
            formData.inputs = [{
                type: "number",
                name: "amount",
                label: "Amount",
                required: true
            }, {
                type: "date",
                name: "dateIssued",
                label: "Date Issued",
                required: true
            }, {
                type: "text",
                name: "leaveDebitType",
                label: "Type",
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description"
            }];

            formService.init(formData, gridData, null, 'leaveDebit', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.dateIssued = formService.formatDate(row.entity.dateIssued);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Leave Debit';
            formData.inputs = [{
                type: "number",
                name: "amount",
                label: "Amount",
                required: true
            }, {
                type: "date",
                name: "dateIssued",
                label: "Date Issued",
                required: true
            }, {
                type: "text",
                name: "leaveDebitType",
                label: "Type",
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description"
            }];

            formService.init(formData, gridData, row, 'leaveDebit', false);
        }
    };
});