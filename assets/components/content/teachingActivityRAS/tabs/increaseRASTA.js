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
            formData.title = 'Add Load Increase';
            formData.inputs = [{
                type: "number",
                name: "FCEValue",
                label: "FCE Value",
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                required: true
            }];

            formService.init(formData, gridData, null, 'increaseRASTA', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Load Increase';
            formData.inputs = [{
                type: "number",
                name: "FCEValue",
                label: "FCE Value",
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                required: true
            }];

            formService.init(formData, gridData, row, 'increaseRASTA', false);
        },
    };
});