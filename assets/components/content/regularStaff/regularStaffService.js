application.service('regularStaffService', function($http, $q, _, formService) {

    return {
        gridOptions: function() {
            return {
                multiSelect: false,
                enableRowHeaderSelection: false,
                enableHorizontalScrollbar: 0,
                columnDefs: [{
                    name: 'First Name',
                    field: 'firstName'
                }, {
                    name: 'Last Name',
                    field: 'lastName'
                }, {
                    name: 'Department',
                    field: 'departmentCode'
                }, {
                    name: 'Rank',
                    field: 'Rank'
                }, {
                    name: 'Tenure Date',
                    field: 'tenureDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }, {
                    name: 'Cont\' appointment date',
                    field: 'contAppDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }]
            };
        },
        tabs: function() {
            return {
                teachingActivity: {
                    title: 'Teaching Activity',
                    gridOptions: {
                        multiSelect: false,
                        enableRowHeaderSelection: false,
                        enableHorizontalScrollbar: 0,
                        columnDefs: [{
                            name: 'Dept. Code',
                            field: 'departmentCode'
                        }, {
                            name: 'Course No.',
                            field: 'courseNo',
                        }, {
                            name: 'Section No.',
                            field: 'sectionNo',
                        }, {
                            name: 'Title',
                            field: 'title',
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
                },
                department: {
                    title: 'Department',
                    gridOptions: {
                        multiSelect: false,
                        enableRowHeaderSelection: false,
                        enableHorizontalScrollbar: 0,
                        columnDefs: [{
                            name: 'Code',
                            field: 'departmentCode'
                        }, {
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
                },
                rank: {
                    title: 'Rank',
                    gridOptions: {
                        multiSelect: false,
                        enableRowHeaderSelection: false,
                        enableHorizontalScrollbar: 0,
                        columnDefs: [{
                            name: 'Name',
                            field: 'title'
                        }, {
                            name: 'Description',
                            field: 'description'
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
                },
                employment: {
                    title: 'Employement',
                    gridOptions: {
                        multiSelect: false,
                        enableRowHeaderSelection: false,
                        enableHorizontalScrollbar: 0,
                        columnDefs: [{
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
            return $http.post('/regularStaff/updateRAS', formData.model);
        },
        create: function(formData) {
            return $http.post('/regularStaff/createRAS', formData.model);
        },
        delete: function(formData) {
            return $http.post('/regularStaff/deleteRAS', formData.model);
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "tenureDate",
                label: "Tenure date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "contAppDate",
                label: "Cont' appointment date",
                disabled: false,
                required: false
            }];

            formService.setGridData(gridData);
            formService.setFormData(formData, 'regularStaffService');
        },
        initEditForm: function(formData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "tenureDate",
                label: "Tenure date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "contAppDate",
                label: "Cont' appointment date",
                disabled: false,
                required: false
            }];

            formService.setRow(row);
            formService.setFormData(formData, 'regularStaffService');
        },
        getTeachingActivity: function(teachingActivity, row) {
            $http.get('/regularStaff/getInfo?type=teaching&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    teachingActivity.gridOptions.data = res.data;
                });
        },
        getDepartment: function(department, row) {
            $http.get('/regularStaff/getInfo?type=department&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    department.gridOptions.data = res.data;
                });
        },
        getRank: function(rank, row) {
            $http.get('/regularStaff/getInfo?type=rank&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    rank.gridOptions.data = res.data;
                });
        },
        getEmployment: function(employment, row) {
            $http.get('/regularStaff/getInfo?type=employment&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    employment.gridOptions.data = res.data;
                });
        }
    };
});