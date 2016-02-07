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
                    name: 'Primary Department',
                    field: 'departmentCode'
                }, {
                    name: 'Rank',
                    field: 'rank'
                }, {
                    name: 'Employee No',
                    field: 'employeeNo'
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
                        self.resetValidation(formData);  // because the form gives ugly errors...
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
            formData.title = 'Add a Staff';
        },
        initEditForm: function(formData, row) {
            formData.staff = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit a Staff';
        },
        flattenData: function(regularStaffs) {
            var flattenedData = [];
            _.forEach(regularStaffs, function(value, key) {
                flattenedData.push({
                    regularStaffID: value.regularStaffID,
                    employeeNo: value.academicStaffID[0].employeeNo,
                    firstName: value.academicStaffID[0].firstName,
                    lastName: value.academicStaffID[0].lastName,
                    departmentCode: value.academicStaffID[0].departments[0].departmentID.departmentCode,
                    rank: findCurrentRank(value),
                    contApptDate: formatDate(value.contApptDate),
                    tenureDate: formatDate(value.tenureDate)
                });
            });
            return flattenedData;
        },
        flattenDepartments: function(departments) {
            var flattenedData = [];
            _.forEach(departments, function(value, key) {
                flattenedData.push({
                    departmentCode: value.departmentID.departmentCode,
                    departmentTitle: value.departmentID.title,
                    startDate: formatDate(value.startDate)
                });
            });
            return flattenedData;
        },
        flattenRanks: function(ranks) {
            var flattenedData = [];
            _.forEach(ranks, function(value, key) {
                flattenedData.push({
                    title: value.rankID.title,
                    description: value.rankID.description,
                    startDate: formatDate(value.startDate)
                });
            });
            return flattenedData;
        }
    };

    function findCurrentRank(value) {
        var currentRank = _.findLast(value.ranks, function(rank) {
            return !rank.endDate;
        });

        if (currentRank) return currentRank.rankID.title;
        return null;
    }

    function formatDate(date) {
        if (date) return moment(date).format('YYYY-MM-DD');
        return null;
    }
});