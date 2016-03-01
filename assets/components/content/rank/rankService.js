application.service('rankService', function($http, _, formService) {
    
    return {
        gridOptions: function() {
            return {
                columnDefs: [{
                    name: 'Title',
                    field: 'title'
                }, {
                    name: 'Description',
                    field: 'description'
                }]
            };
        },
        update: function(formData) {
            return $http.put('/rank/' +  formData.model.rankID, formData.model);
        },
        create: function(formData) {
            return $http.post('/rank/', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/rank/' + formData.model.rankID);
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Rank';
            formData.inputs = [{
                type: "text",
                name: "title",
                label: "Title",
                disabled: false,
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description",
                disabled: false,
                required: true
            }];

            formService.init(formData, gridData, null, 'rankService', true);
        },
        initEditForm: function(formData, gridData, row) {
            console.log(row.entity);
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Rank';
            formData.inputs = [{
                type: "text",
                name: "title",
                label: "Title",
                disabled: false,
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description",
                disabled: false,
                required: true
            }];

            formService.init(formData, gridData, row, 'rankService', true);
        },
        getRow: function(row) {
            return $http.get('/rank/' + row.entity.rankID);
        }
    };
});