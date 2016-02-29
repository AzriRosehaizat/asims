application.service('departmentService', function($http, $q, _, formService) {

    return {
        gridOptions: function() {
            return {
                columnDefs: [{
                    name: 'Code',
                    field: 'departmentCode'
                }, {
                    name: 'Department',
                    field: 'title'
                }, {
                    name: 'Chair',
                    field: 'Chair'
                }, {
                    name: 'Description',
                    field: 'description'
                }, {
                    name: 'Faculty',
                    field: 'facultyTitle'
                }]
            };
        },
        update: function(formData) {
            //Return a flattned object after update
            return $http.put('/Department', formData.model)
                .then(function(res) {
                    return $http.get('/Department/' + res.data.departmentID)
                        .then(function(Dept) {
                            return Dept;
                        });
                });
        },
        create: function(formData) {
            //Return a flattned object after create
            return $http.post('/Department', formData.model)
                .then(function(res) {
                    return $http.get('/Department/' + res.data.departmentID)
                        .then(function(Dept) {
                            return Dept;
                        });
                });
        },
        delete: function(formData) {
            return $http.delete('/Department/' + formData.model.departmentID);

        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Department';
            formData.inputs = [{
                type: "text",
                name: "departmentCode",
                label: "Code",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Department",
                disabled: false,
                required: true
            }, {
                type: "autocomplete",
                name: "facultyTitle",
                label: "Faculty",
                disabled: false,
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, null, 'departmentService', true);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Department';
            formData.inputs = [{
                type: "text",
                name: "departmentCode",
                label: "Code",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Name",
                disabled: false,
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description",
                disabled: false,
                required: false
            }, {
                type: "text",
                name: "facultyTitle",
                label: "Faculty",
                disabled: false,
                required: true
            }];

            formService.init(formData, gridData, row, 'departmentService', true);
        },
        getRow: function(row) {
            return $http.get('/Department/getAllDepartment/' + row.entity.departmentID);

        }
    };
});