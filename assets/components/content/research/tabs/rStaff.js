application.service('rStaff', function($http, _, formService) {
    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/RegularStaff_Research/' + formData.model.researchID, formData.model);
        },
        create: function(formData) {
            formData.model.researchID = mainRow.entity.researchID;
            return $http.post('/RegularStaff_Research/', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/RegularStaff_Research/' + formData.model.researchID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, null, 'rStaff', true);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                disabled: true,
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                disabled: true,
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, row, 'rStaff', false);
        },
    };
});