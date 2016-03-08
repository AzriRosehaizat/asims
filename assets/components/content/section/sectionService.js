application.service('sectionService', function($http, _, formService) {

    return {
        gridOptions: function() {
            return {
                columnDefs: [{
                    name: 'Section No.',
                    field: 'sectionNo'
                }, {
                    name: 'Section Type',
                    field: 'sectionType'
                }, {
                    name: 'FCE Modifier',
                    field: 'FCEModifier'
                }]
            };
        },
        update: function(formData) {
            return $http.put('/Section/' + formData.model.sectionID, formData.model)
                .then(function(res) {
                    // Section_Offered causes an error
                    delete(res.data.Section_Offered);
                    return res;
                });
        },
        create: function(formData) {
            return $http.post('/Section/', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/Section/' + formData.model.sectionID);
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Section';
            formData.inputs = [{
                type: "text",
                name: "sectionNo",
                label: "Section No.",
                required: true
            }, {
                type: "text",
                name: "sectionType",
                label: "Section Type",
                required: true
            }, {
                type: "number",
                name: "FCEModifier",
                label: "FCE Modifier",
                required: true
            }];

            formService.init(formData, gridData, null, 'sectionService', true);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Section';
            formData.inputs = [{
                type: "text",
                name: "sectionNo",
                label: "Section No.",
                required: true
            }, {
                type: "text",
                name: "sectionType",
                label: "Section Type",
                required: true
            }, {
                type: "number",
                name: "FCEModifier",
                label: "FCE Modifier",
                required: true
            }];

            formService.init(formData, gridData, row, 'sectionService', true);
        },
        getRow: function(row) {
            return $http.get('/Section/' + row.entity.sectionID + '?populate');
        }
    };
});