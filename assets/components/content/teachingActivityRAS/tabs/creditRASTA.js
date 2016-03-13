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
            formData.title = 'Banked';
            formData.inputs = [{
                type: "number",
                name: "FCEValue",
                label: "FCE Value",
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description"
            }, {
                type: "date",
                name: "dateIssued",
                label: "Date Issued",
                required: true
            }];

            formService.init(formData, gridData, null, 'creditRASTA', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.dateIssued = formService.formatDate(row.entity.dateIssued);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Banked';
            formData.inputs = [{
                type: "number",
                name: "FCEValue",
                label: "FCE Value",
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description"
            }, {
                type: "date",
                name: "dateIssued",
                label: "Date Issued",
                required: true
            }];

            formService.init(formData, gridData, row, 'creditRASTA', false);
        },
    };
});