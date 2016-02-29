application.service('dTabService', function($http, dCourse, dChair, dRegularStaff,dContractStaff, $mdDialog) {

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
                        }]
                    }
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
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'Tenure Date',
                            field: 'tenureDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'Cont\' appointment date',
                            field: 'contAppDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
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
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
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
        initAddForm: function(formData, tab, mainRow) {
            switch (tab.title) {
                case 'Course':
                    dCourse.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Regular Staff':
 
                    // dRegularStaff.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Contract Staff':;

                    break;
                case 'Chair':
                    dChair.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Course':
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