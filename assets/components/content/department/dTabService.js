application.service('dTabService', function($http, dCourse, dChair, dRegularStaff, dContractStaff, $mdDialog) {

    return {
        tabs: function() {
            return {
                course: {
                    title: 'Course',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Department',
                            field: 'departmentCode'
                        }, {
                            name: 'Course',
                            field: 'courseNo'
                        }, {
                            name: 'Title',
                            field: 'title'
                        }],
                    },
                    readOnly: true

                },
                regularStaff: {
                    title: 'Regular Staff',
                    gridOptions: {
                        columnDefs: [{
                            name: 'First Name',
                            field: 'firstName'
                        }, {
                            name: 'Last Name',
                            field: 'lastName'
                        }, {
                            name: 'Rank',
                            field: 'Rank'
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'Tenure Date',
                            field: 'tenureDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'Cont\' appointment date',
                            field: 'contAppDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }]
                    }
                },
                contractStaff: {
                    title: 'Contract Staff',
                    gridOptions: {
                        columnDefs: [{
                            name: 'First Name',
                            field: 'firstName'
                        }, {
                            name: 'Last Name',
                            field: 'lastName'
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }]
                    }
                },
                chair: {
                    title: 'Chair',
                    gridOptions: {
                        columnDefs: [{
                            name: 'First Name',
                            field: 'firstName'
                        }, {
                            name: 'Last Name',
                            field: 'lastName'
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }]
                    }
                }
            };
        },
        initAddForm: function(formData, tab, mainRow) {
            switch (tab.title) {
                case 'Course':
                    tab.gridOptions.data.readOnly = tab.readOnly;
                    dCourse.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Regular Staff':

                    // dRegularStaff.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Contract Staff':

                    break;
                case 'Chair':
                    dChair.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Course':
                    tab.gridOptions.data.readOnly = tab.readOnly;
                    dCourse.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Regular Staff':
                    dRegularStaff.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Contract Staff':
                    dContractStaff.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Chair':
                    dChair.initEditForm(formData, tab.gridOptions.data, row);
                    break;
            }
        },
        getTabs: function(tabs, row) {
            this.getCourse(tabs.course, row);
            this.getRegularStaff(tabs.regularStaff, row);
            this.getContractStaff(tabs.contractStaff, row);
            this.getChair(tabs.chair, row);
        },
        getCourse: function(course, row) {
            $http.get('/department/getInfo?type=course&id=' + row.entity.departmentID)
                .then(function(res) {
                    course.gridOptions.data = res.data;
                });
        },
        getRegularStaff: function(regularStaff, row) {
            $http.get('/department/getInfo?type=regularStaff&id=' + row.entity.departmentID)
                .then(function(res) {
                    regularStaff.gridOptions.data = res.data;
                });
        },
        getContractStaff: function(contractStaff, row) {
            $http.get('/department/getInfo?type=contractStaff&id=' + row.entity.departmentID)
                .then(function(res) {
                    contractStaff.gridOptions.data = res.data;
                });
        },
        getChair: function(chair, row) {
            $http.get('/department/getInfo?type=chair&id=' + row.entity.departmentID)
                .then(function(res) {
                    chair.gridOptions.data = res.data;
                });
        }
    };
});