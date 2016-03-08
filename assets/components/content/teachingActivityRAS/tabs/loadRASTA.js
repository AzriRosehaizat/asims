application.service('loadRASTA', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.put('/load/' + formData.model.loadID, formData.model)
                .then(function(res) {
                    res.data.regularStaffID = res.data.regularStaffID.regularStaffID;
                    return res;
                });
        },
        create: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.post('/load', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/load/' + formData.model.loadID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Load';
            formData.inputs = [{
                type: "number",
                name: "FCEValue",
                label: "FCE Value"
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                minDate: "startDate"
            }];

            formService.init(formData, gridData, null, 'loadRASTA', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Load';
            formData.inputs = [{
                type: "number",
                name: "FCEValue",
                label: "FCE Value"
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                minDate: "startDate"
            }];

            formService.init(formData, gridData, row, 'loadRASTA', false);
        },
    };
});