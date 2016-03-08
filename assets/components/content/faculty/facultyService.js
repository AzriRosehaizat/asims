application.service('facultyService', function($http, _, formService) {

    return {
        gridOptions: function() {
            return {
                columnDefs: [{
                    name: 'Title',
                    field: 'title'
                }]
            };
        },
        update: function(formData) {
            return $http.put('/faculty/' + formData.model.facultyID, formData.model)
                .then(function(res) {
                    // Department causes an error
                    delete(res.data.Department);
                    return res;
                });
        },
        create: function(formData) {
            return $http.post('/faculty/', formData.model);
        },
        delete: function(formData) {
            return $http.delete('/faculty/' + formData.model.facultyID);
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Faculty';
            formData.inputs = [{
                type: "text",
                name: "title",
                label: "Title",
                required: true
            }];
            
            formService.init(formData, gridData, null, 'facultyService', true);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Faculty';
            formData.inputs = [{
                type: "text",
                name: "title",
                label: "Title",
                required: true
            }];
            
            formService.init(formData, gridData, row, 'facultyService', true);
        },
        getRow: function(row) {
            return $http.get('/faculty/' + row.entity.facultyID + '?populate');
        }
    };
});