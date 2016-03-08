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
            return $http.put('/Department/' + formData.model.departmentID, formData.model)
                .then(function(res) {
                    return $http.get('/Department/getAllDepartment/' + res.data.departmentID);
                });
        },
        create: function(formData) {
            return $http.post('/Department', formData.model)
                .then(function(res) {
                    return $http.get('/Department/getAllDepartment/' + res.data.departmentID);
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
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Department",
                required: true
            }, {
                type: "autocomplete",
                name: "facultyTitle",
                label: "Faculty",
                url: {
                    start: "/Faculty?where={",
                    end: "\"title\":{\"startsWith\":\""
                },
                link: "application.faculty",
                output: {
                    obj: {},
                    name: "title"
                },
                assign: [{
                    from: "facultyTitle.obj.facultyID",
                    to: "facultyID"
                }],
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description"
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
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Department",
                required: true
            }, {
                type: "autocomplete",
                name: "facultyTitle",
                label: "Faculty",
                url: {
                    start: "/Faculty?where={",
                    end: "\"title\":{\"startsWith\":\""
                },
                link: "application.faculty",
                output: {
                    obj: {},
                    name: "title"
                },
                assign: [{
                    from: "facultyTitle.obj.facultyID",
                    to: "facultyID"
                }],
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description"
            }];

            formService.init(formData, gridData, row, 'departmentService', true);
        },
        getRow: function(row) {
            return $http.get('/Department/getAllDepartment/' + row.entity.departmentID);
        }
    };
});