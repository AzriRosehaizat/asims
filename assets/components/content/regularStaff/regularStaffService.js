application.service('regularStaffService', function($http, $mdDialog, _, moment, toaster) {

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
                    field: 'tenureDate'
                }, {
                    name: 'Cont\' Appt\' Date',
                    field: 'contApptDate'
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
                            field: 'departmentTitle'
                        }, {
                            name: 'Start Date',
                            field: 'startDate'
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
                            field: 'startDate'
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
        formatDate: function(date) {
            if (date) return moment(date).format('YYYY-MM-DD');
            return null;
        }
    };
});