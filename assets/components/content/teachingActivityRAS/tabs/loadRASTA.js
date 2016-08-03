application.service('loadRASTA', ['$http', '_', 'formService', function($http, _, formService) {

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
                type: "select",
                name: "year",
                label: "Year",
                items: formService.getYears(),
                path: "year",
                text: "Select a year",
                required: true
            }];

            formService.init(formData, gridData, null, 'loadRASTA', false);
        },
        initEditForm: function(formData, gridData, row) {

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Load';
            formData.inputs = [{
                type: "number",
                name: "FCEValue",
                label: "FCE Value"
            }, {
                type: "select",
                name: "year",
                label: "Year",
                items: formService.getYears(),
                path: "year",
                text: "Select a year",
                required: true
            }];

            formService.init(formData, gridData, row, 'loadRASTA', false);
        },
    };
}]);