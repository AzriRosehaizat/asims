application.service('leaveCredit', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/LeaveCredit/' + formData.model.leaveCreditID, formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=leaveCredits&id=' + res.data.regularStaffID.regularStaffID +
                                     '&where=' + res.data.leaveCreditID);
                });
        },
        create: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.post('/LeaveCredit', formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=leaveCredits&id=' + res.data.regularStaffID +
                                     '&where=' + res.data.leaveCreditID);
                });
        },
        delete: function(formData) {
            return $http.delete('/LeaveCredit/' + formData.model.leaveCreditID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Leave Debit';
            formData.inputs = [{
                type: "currency",
                name: "amount",
                label: "Amount (CAD)",
                required: true
            }, {
                type: "date",
                name: "dateIssued",
                label: "Date Issued",
                required: true
            }, {
                type: "text",
                name: "leaveCreditType",
                label: "Type",
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description"
            }];

            formService.init(formData, gridData, null, 'leaveCredit', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.dateIssued = formService.formatDate(row.entity.dateIssued);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Leave Debit';
            formData.inputs = [{
                type: "currency",
                name: "amount",
                label: "Amount (CAD)",
                required: true
            }, {
                type: "date",
                name: "dateIssued",
                label: "Date Issued",
                required: true
            }, {
                type: "text",
                name: "leaveCreditType",
                label: "Type",
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description"
            }];

            formService.init(formData, gridData, row, 'leaveCredit', false);
        }
    };
});