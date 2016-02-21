application.service('courseService', function($http, $q, _, formService) {

    return {
        gridOptions: function() {
            return {
                multiSelect: false,
                enableRowHeaderSelection: false,
                enableHorizontalScrollbar: 0,
                columnDefs: [{
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
        tabs: function() {
            return {
                section: {
                    title: 'Section',
                    gridOptions: {
                        multiSelect: false,
                        enableRowHeaderSelection: false,
                        enableHorizontalScrollbar: 0,
                        columnDefs: [{
                            name: 'Name',
                            field: 'title'
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }]
                    }
                }
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
            formData.title = 'Add Course';
            formData.inputs = [{
                type: "text",
                name: "courseNo",
                label: "Course No",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Name",
                required: true
            }, {
                type: "text",
                name: "description",
                label: "Description",
                required: false
            }];
            
            formService.setGridData(gridData);
            formService.setFormData(formData, 'courseService');
        },
        initEditForm: function(formData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Course';
            formData.inputs = [{
                type: "text",
                name: "courseNo",
                label: "Course No",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Name",
                required: true
            }, {
                type: "text",
                name: "description",
                label: "Description",
                required: false
            }];
            
            formService.setRow(row);
            formService.setFormData(formData, 'courseService');
        },
        // getDepartment: function(departments, row) {
        //     $http.get('/regularStaff/getInfo?type=department&id=' + row.entity.academicStaffID)
        //         .then(function(res) {
        //             departments.gridOptions.data = res.data;
        //         });
        // },
        // getRank: function(ranks, row) {
        //     $http.get('/regularStaff/getInfo?type=rank&id=' + row.entity.academicStaffID)
        //         .then(function(res) {
        //             ranks.gridOptions.data = res.data;
        //         });
        // },
        // getEmployment: function(employment, row) {
        //     $http.get('/regularStaff/getInfo?type=employment&id=' + row.entity.academicStaffID)
        //         .then(function(res) {
        //             employment.gridOptions.data = res.data;
        //         });
        // }
    };
});