application.service('courseService', function($http, $q, _, formService) {

    return {
        gridOptions: function() {
            return {
                columnDefs: [{
                    name: 'Department',
                    field: 'departmentCode'
                }, {
                    name: 'Course No',
                    field: 'courseNo'
                }, {
                    name: 'Name',
                    field: 'title'
                }, {
                    name: 'Description',
                    field: 'description'
                }]
            };
        },
        update: function(formData) {
            return $http.put('/Course/' + formData.model.courseID, formData.model)
                .then(function(res) {
                    return $http.get('/Course/getAllCourse/' + res.data.courseID);
                });
        },
        create: function(formData) {
            return $http.post('/Course', formData.model)
                .then(function(res) {
                    return $http.get('/Course/getAllCourse/' + res.data.courseID);
                });
        },
        delete: function(formData) {
            return $http.delete('/Course/' + formData.model.courseID);
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Course';
            formData.inputs = [{
                type: "autocomplete",
                name: "departmentCode",
                label: "Dept. Code",
                url: {
                    start: "/Department?where={",
                    end: "\"departmentCode\":{\"startsWith\":\""
                },
                link: "application.department",
                output: {
                    obj: {},
                    name: "departmentCode"
                },
                assign: [{
                    from: "departmentCode.obj.departmentID",
                    to: "departmentID"
                }],
                required: true
            }, {
                type: "text",
                name: "courseNo",
                label: "Course No.",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Title",
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description",
            }];

            formService.init(formData, gridData, null, 'courseService', true);
        },
        initEditForm: function(formData, gridData, row) {

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Course';
            formData.inputs = [{
                type: "autocomplete",
                name: "departmentCode",
                label: "Dept. Code",
                url: {
                    start: "/Department?where={",
                    end: "\"departmentCode\":{\"startsWith\":\""
                },
                link: "application.department",
                output: {
                    obj: {},
                    name: "departmentCode"
                },
                assign: [{
                    from: "departmentCode.obj.departmentID",
                    to: "departmentID"
                }],
                required: true
            }, {
                type: "text",
                name: "courseNo",
                label: "Course No.",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Title",
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description",
            }];

            formService.init(formData, gridData, row, 'courseService', true);
        },

        getRow: function(row) {
            return $http.get('/course/getAllCourse/' + row.entity.courseID);
        }
    };
});