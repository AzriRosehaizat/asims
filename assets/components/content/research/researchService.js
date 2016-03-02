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
                    cellFilter: 'date:\'MM-dd-yyyy\''
                }, {
                    name: 'End Date',
                    field: 'endDate',
                    cellFilter: 'date:\'MM-dd-yyyy\''
                }]
            };
        },
        update: function(formData) {
            return $http.put('/research/' + formData.model.researchID, formData.model);
        },
        create: function(formData) {
            return $http.post('/research/', formData.model);
        },
        delete: function(formData) { 
            return $http.delete('/research/' + formData.model.researchID);
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
            return $http.get('/research/' + row.entity.researchID + '?populate');
        }
    };
});