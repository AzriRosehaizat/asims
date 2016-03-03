application.service('courseService', function($http, $q, _, formService) {

    return {
        gridOptions: function() {
            return {
                noUnselect: true,
                multiSelect: false,
                enableRowHeaderSelection: false,
                enableHorizontalScrollbar: 0,
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
                    name: 'section',
                    field: 'description'
                }]
            };
        },
        update: function(formData) {
            if (_.isObject(formData.model.courseID)) {
                formData.model.courseID = formData.model.courseID.obj.courseID;
            }
            //Return a flattned object after update
            return $http.put('/Course/' + formData.model.courseID, formData.model)
                .then(function(res) {
                    return $http.get('/Course/getAllCourse/' + res.data.courseID)
                        .then(function(Sect) {
                            return Sect;
                        });
                });
        },
        create: function(formData) {
            console.log(formData.model);
            if (_.isObject(formData.model.departmentID)) {
                formData.model.departmentID = formData.model.departmentID.obj.departmentID;
            }
            return $http.post('/course/' + formData.model.courseID);
            // //Return a flattned object after create
            // return $http.post('/Course', formData.model)
            //     .then(function(res) {
            //         return $http.get('/Course/getAllCourse/' + res.data.courseID)
            //             .then(function(Sect) {
            //                 return Sect;
            //             });
            //     });
        },
        delete: function(formData) {
            return $http.delete('/Course/' + formData.model.courseID);

        },
        
        // update: function(formData) {
        //     return $http.post('/regularStaff/updateRAS', formData.model);
        // },
        // create: function(formData) {
        //     return $http.post('/regularStaff/createRAS', formData.model);
        // },
        // delete: function(formData) {
        //     return $http.post('/regularStaff/deleteRAS', formData.model);
        // },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Course';
            formData.inputs = [{
                type: "text",
                name: "courseNo",
                label: "Course No",
                disabled: false,
                required: true
            },{
                type: "autocomplete",
                name: "departmentID",
                label: "Department",
                url: {
                    start: "/Department?where={",
                    end: "\"departmentID\":{\"startsWith\":\""
                },
                link: "application.department",
                output: {
                    obj: {},
                    name: "departmentID"
                },
                disabled: false,
                required: true
            },{
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
            }];
            console.log(formData);


            formService.init(formData, gridData, null, 'courseService', true);
        },
        initEditForm: function(formData, gridData, row) {
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Course';
            formData.inputs = [{
                type: "text",
                name: "courseNo",
                label: "Course No",
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
            }];

            console.log(formData);
            formService.init(formData, gridData, row, 'courseService', true);
        },
      
        getRow: function(row) {
            return $http.get('/course/getAllCourse/' + row.entity.courseID);
        }
        
    };
});