application.service('regularStaffService', function($http, $mdDialog, _, toaster, formService) {

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
        cancel: function(formData, row) {
            if (formData.isEditing) {
                _.merge(formData.model, row.entity);
            }
            else {
                formData.model = {};
            }
            this.resetValidation(formData);
        },
        delete: function(ev, gridData, formData) {
            var self = this;
            var confirm = $mdDialog.confirm()
                .title('You are deleting ' + formData.model.firstName + ' ' + formData.model.lastName)
                .textContent('Are you sure?')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                formData.mode = 'indeterminate';
                var index = gridData.indexOf(formData.model);

                $http.delete('/regularStaff/' + formData.model.regularStaffID)
                    .then(function(res) {
                        gridData.splice(index, 1);
                        self.initAddForm(formData);
                        self.resetValidation(formData); // because the form gives ugly errors...
                        toaster.open("Deleted successfully!");
                    }, function(err) {
                        toaster.open(err);
                    })
                    .finally(function(notice) {
                        formData.mode = '';
                    });
            });
        },
        resetValidation: function(formData) {
            formData.form.$setPristine();
            formData.form.$setUntouched();
        },
        initAddForm: function(formData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Staff';
            formData.inputs = [{
                name: "firstName",
                label: "First name",
                model: formData.model.firstName,
                required: true
            }, {
                name: "lastName",
                label: "Last name",
                model: formData.model.lastName,
                required: true
            }, {
                name: "tenureDate",
                label: "Tenure date",
                model: formData.model.tenureDate,
                required: false
            }, {
                name: "contApptDate",
                label: "Cont' appointment date",
                model: formData.model.contApptDate,
                required: false
            }];
            
            formService.setFormData(formData);
        },
        initEditForm: function(formData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Staff';
            formData.inputs = [{
                name: "firstName",
                label: "First name",
                model: formData.model.firstName,
                required: true
            }, {
                name: "lastName",
                label: "Last name",
                model: formData.model.lastName,
                required: true
            }, {
                name: "tenureDate",
                label: "Tenure date",
                model: formData.model.tenureDate,
                required: false
            }, {
                name: "contApptDate",
                label: "Cont' appointment date",
                model: formData.model.contApptDate,
                required: false
            }];
            
            formService.setFormData(formData);
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