application.service('regularStaffService', function($http, _, formService) {

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
                    name: 'Cont\' Appt\' Date',
                    field: 'contApptDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }]
            };
        },
        tabs: function() {
            return {
                departments: {
                    title: 'Departments',
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
                ranks: {
                    title: 'Ranks',
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
                }
            };
        },
        submit: function(formData) {
            console.log("submit");
        },
        delete: function(formData) {
            return $http.delete('/regularStaff/' + formData.model.academicStaffID);
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
                name: "tenureDate",
                label: "Tenure date",
                required: false
            }, {
                type: "date",
                name: "contApptDate",
                label: "Cont' appointment date",
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
                model: "fs.formData.model.firstName",
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                model: "fs.formData.model.lastName",
                required: true
            }, {
                type: "date",
                name: "tenureDate",
                label: "Tenure date",
                model: "fs.formData.model.tenureDate",
                required: false
            }, {
                type: "date",
                name: "contApptDate",
                label: "Cont' appointment date",
                model: "fs.formData.model.contApptDate",
                required: false
            }];
            
            formService.setRow(row);
            formService.setFormData(formData, 'regularStaffService');
        },
        getDepartment: function(departments, row) {
            $http.get('/regularStaff/getDepartment/' + row.entity.academicStaffID)
                .then(function(res) {
                    departments.gridOptions.data = res.data;
                });
        },
        getRank: function(ranks, row) {
            $http.get('/regularStaff/getRank/' + row.entity.academicStaffID)
                .then(function(res) {
                    ranks.gridOptions.data = res.data;
                });
        }
    };
});