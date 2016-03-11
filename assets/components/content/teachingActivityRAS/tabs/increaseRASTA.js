application.service('increaseRASTA', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.put('/loadIncrease/' + formData.model.loadIncreaseID, formData.model)
                .then(function(res) {
                    res.data.regularStaffID = res.data.regularStaffID.regularStaffID;
                    return res;
                });
        },
        create: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.post('/loadIncrease', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/loadIncrease/' + formData.model.loadIncreaseID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Load Increase';
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
                type: "select",
                name: "year",
                label: "Year",
                items: formService.getYears(),
                path: "year",
                text: "Select a year",
                required: true
            }, {
                type: "date",
                name: "dateIssued",
                label: "Date Issued"
            }];

            formService.init(formData, gridData, null, 'increaseRASTA', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.dateIssued = formService.formatDate(row.entity.dateIssued);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Load Increase';
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
                type: "select",
                name: "year",
                label: "Year",
                items: formService.getYears(),
                path: "year",
                text: "Select a year",
                required: true
            }, {
                type: "date",
                name: "dateIssued",
                label: "Date Issued"
            }];

            formService.init(formData, gridData, row, 'increaseRASTA', false);
        },
    };
});