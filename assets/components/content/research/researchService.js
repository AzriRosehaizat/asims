application.service('researchService', function($http, $q, _, formService) {

    return {
        gridOptions: function() {
            return {
                multiSelect: false,
                enableRowHeaderSelection: false,
                enableHorizontalScrollbar: 0,
                columnDefs: [{
                    name: 'Title',
                    field: 'title'
                }, {
                    name: 'Abstract',
                    field: 'abstract'
                }, {
                    name: 'Start Date',
                    field: 'startDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }, {
                    name: 'End Date',
                    field: 'endDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }]
            };
        },
        update: function(formData) {
            console.log("update");
            return $q.when(true);
        },
        create: function(formData) {
            console.log("create");
            return $q.when(true);
        },
        delete: function(formData) {
            console.log("delete");
            return $q.when(true);
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Research';
            formData.inputs = [{
                type: "text",
                name: "title",
                label: "Name",
                disabled: false,
                required: true
            }, {
                type: "textarea",
                name: "abstract",
                label: "Abstract",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, null, 'researchService', true);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Research';
            formData.inputs = [{
                type: "text",
                name: "title",
                label: "Name",
                disabled: false,
                required: true
            }, {
                type: "textarea",
                name: "abstract",
                label: "Abstract",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, row, 'researchService', true);
        },
        getRow: function(row) {
            console.log("researchService: getRow");
            return $q.when(true);
        }
    };
});