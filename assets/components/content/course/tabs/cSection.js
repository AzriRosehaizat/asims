application.service('cSection', function($http, _, formService) {
    // var mainRow;

    return {
        update: function(formData) {
            // read-only
        },
        create: function(formData) {
            // read-only
        },
        delete: function(formData) {
            // read-only
        },
        initAddForm: function(formData, gridData, mRow) {
            // mainRow = mRow;
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Teaching History';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                readonly: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                readonly: true
            }, {
                type: "text",
                name: "sectionNo",
                label: "Section No.",
                readonly: true
            }, {
                type: "text",
                name: "term",
                label: "Term",
                readonly: true
            }, {
                type: "number",
                name: "year",
                label: "Year",
                readonly: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                readonly: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                minDate: "startDate",
                readonly: true
            }, {
                type: "text",
                name: "role",
                label: "Role",
                readonly: true
            }];

            formService.init(formData, gridData, null, 'cSection', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Teaching History';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                readonly: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                readonly: true
            }, {
                type: "text",
                name: "sectionNo",
                label: "Section No.",
                readonly: true
            }, {
                type: "text",
                name: "term",
                label: "Term",
                readonly: true
            }, {
                type: "number",
                name: "year",
                label: "Year",
                readonly: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                readonly: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                minDate: "startDate",
                readonly: true
            }, {
                type: "text",
                name: "role",
                label: "Role",
                readonly: true
            }];
            
            formService.init(formData, gridData, row, 'cSection', false);
        },
    };
});