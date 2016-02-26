application.service('rsTabService', function($http, rsTA, rsDepartment, rsRank, rsEmployment) {

    return {
        tabs: function() {
            return {
                teachingActivity: {
                    title: 'Teaching Activity',
                    gridOptions: {
                        noUnselect: true,
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
                        noUnselect: true,
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
                        noUnselect: true,
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
                employment: {
                    title: 'Employment',
                    gridOptions: {
                        noUnselect: true,
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
        initAddForm: function(formData, tab, mainRow) {
            switch (tab.title) {
                case 'Teaching Activity':
                    rsTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Department':
                    rsDepartment.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Rank':
                    rsRank.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Employement':
                    rsEmployment.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Teaching Activity':
                    rsTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Department':
                    rsDepartment.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Rank':
                    rsRank.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Employement':
                    rsEmployment.initEditForm(formData, tab.gridOptions.data, row);
                    break;
            }
        },
        getTabs: function(tabs, row) {
            this.getTeachingActivity(tabs.teachingActivity, row);
            this.getDepartment(tabs.department, row);
            this.getRank(tabs.rank, row);
            this.getEmployment(tabs.employment, row);
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