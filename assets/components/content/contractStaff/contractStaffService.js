application.service('contractStaffService', function($http, $q, _, formService) {

    return {
        gridOptions: function() {
            return {
                multiSelect: false,
                enableRowHeaderSelection: false,
                enableHorizontalScrollbar: 0,
                columnDefs: [{
                    name: 'First Name',
                    field: 'academicStaffID.firstName'
                }, {
                    name: 'Last Name',
                    field: 'academicStaffID.lastName'
                }, {
                    name: 'Start Date',
                    field: 'ContractStaffEmployment[0].startDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }, {
                    name: 'End Date',
                    field: 'ContractStaffEmployment[0].endDate',
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
                rightToRefuse: {
                    title: 'Right to Refuse',
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
            formData.title = 'Add Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: false
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                required: false
            }];
            
            formService.setGridData(gridData);
            formService.setFormData(formData, 'contractStaffService');
        },
        initEditForm: function(formData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: false
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                required: false
            }];
            
            formService.setRow(row);
            formService.setFormData(formData, 'contractStaffService');
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