application.service('regularStaffService', function($http, $mdDialog, _, toaster) {

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
                    field: 'contAppDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }]
            };
        },
        tabs: function() {
            return {
                departments: {
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
                ranks: {
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
        cancel: function(formData, row) {
            if (formData.isEditing) {
                _.merge(formData.staff, row.entity);
            }
            else {
                formData.staff = {};
            }
            this.resetValidation(formData);
        },
        delete: function(ev, gridData, formData) {
            var self = this;
            var confirm = $mdDialog.confirm()
                .title('You are deleting ' + formData.staff.firstName + ' ' + formData.staff.lastName)
                .textContent('Are you sure?')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                formData.mode = 'indeterminate';
                var index = gridData.indexOf(formData.staff);

                $http.delete('/regularStaff/' + formData.staff.regularStaffID)
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
            formData.staff = {};
            formData.isEditing = false;
            formData.title = 'Add Staff';
        },
        initEditForm: function(formData, row) {
            formData.staff = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Staff';
        },
        getDepartment: function(departments, row) {
            $http.get('/regularStaff/getInfo?type=department&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    departments.gridOptions.data = res.data;
                });
        },
        getRank: function(ranks, row) {
            $http.get('/regularStaff/getInfo?type=rank&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    ranks.gridOptions.data = res.data;
                });
        },
        getEmployment: function(ranks, row) {
            $http.get('/regularStaff/getInfo?type=employment&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    ranks.gridOptions.data = res.data;
                });
        }
    };
});