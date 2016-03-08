application.service('reductionRASTA', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.put('/loadReduction/' + formData.model.loadReductionID, formData.model)
                .then(function(res) {
                    res.data.regularStaffID = res.data.regularStaffID.regularStaffID;
                    return res;
                });
        },
        create: function(formData) {
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.post('/loadReduction', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/loadReduction/' + formData.model.loadReductionID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Load Reduction';
            formData.inputs = [{
                type: "number",
                name: "FCEValue",
                label: "FCE Value",
                required: true
            }, {
                type: "text",
                name: "description",
                label: "Description"
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                minDate: "startDate",
                required: true
            }];

            formService.init(formData, gridData, null, 'reductionRASTA', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Load Reduction';
            formData.inputs = [{
                type: "number",
                name: "FCEValue",
                label: "FCE Value",
                required: true
            }, {
                type: "text",
                name: "description",
                label: "Description"
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                minDate: "startDate",
                required: true
            }];

            formService.init(formData, gridData, row, 'reductionRASTA', false);
        },
    };
});