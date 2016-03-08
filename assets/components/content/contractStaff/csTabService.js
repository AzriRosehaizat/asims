application.service('csTabService', function($http, csTA, csRTR, csDepartment, csRank, csEmployment) {

    return {
        tabs: function() {
            return {
                teachingActivity: {
                    title: 'Teaching Activity',
                    gridOptions: {
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
                            name: 'Term',
                            field: 'term',
                        }, {
                            name: 'Year',
                            field: 'year',
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'FCE',
                            displayName: 'FCE',
                            field: 'FCEValue'
                        }, {
                            name: 'Role',
                            field: 'role'
                        }]
                    }
                },
                rightToRefusal: {
                    title: 'Right to Refusal',
                    gridOptions: {
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
                            name: 'Term',
                            field: 'term',
                        }, {
                            name: 'Year',
                            field: 'year',
                        }]
                    }
                },
                department: {
                    title: 'Department',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Code',
                            field: 'departmentCode'
                        }, {
                            name: 'Name',
                            field: 'title'
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
                rank: {
                    title: 'Rank',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Name',
                            field: 'title'
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
                employment: {
                    title: 'Employment',
                    gridOptions: {
                        columnDefs: [{
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
                case 'Teaching Activity':
                    csTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Right to Refusal':
                    csRTR.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Department':
                    csDepartment.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Rank':
                    csRank.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Employment':
                    csEmployment.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Teaching Activity':
                    csTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Right to Refusal':
                    csRTR.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Department':
                    csDepartment.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Rank':
                    csRank.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Employment':
                    csEmployment.initEditForm(formData, tab.gridOptions.data, row);
                    break;
            }
        },
        getTabs: function(tabs, row) {
            this.getTeachingActivity(tabs.teachingActivity, row);
            this.getRightToRefusal(tabs.rightToRefusal, row);
            this.getDepartment(tabs.department, row);
            this.getRank(tabs.rank, row);
            this.getEmployment(tabs.employment, row);
        },
        getTeachingActivity: function(teachingActivity, row) {
            $http.get('/contractStaff/getInfo?type=teaching&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    teachingActivity.gridOptions.data = res.data;
                });
        },
        getRightToRefusal: function(rightToRefusal, row) {
            $http.get('/contractStaff/getInfo?type=rightToRefusal&id=' + row.entity.contractStaffID)
                .then(function(res) {
                    rightToRefusal.gridOptions.data = res.data;
                });
        },
        getDepartment: function(department, row) {
            $http.get('/contractStaff/getInfo?type=department&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    department.gridOptions.data = res.data;
                });
        },
        getRank: function(rank, row) {
            $http.get('/contractStaff/getInfo?type=rank&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    rank.gridOptions.data = res.data;
                });
        },
        getEmployment: function(employment, row) {
            $http.get('/contractStaff/getInfo?type=employment&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    employment.gridOptions.data = res.data;
                });
        }
    };
});