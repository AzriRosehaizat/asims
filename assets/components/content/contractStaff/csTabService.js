application.service('csTabService', function($http, csTA, csRTR, csDepartment) {

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
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
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
                rightToRefuse: {
                    title: 'Right to Refuse',
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
                            name: 'Start Term',
                            field: 'startTerm',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'End Term',
                            field: 'endTerm',
                            cellFilter: 'date:\'yyyy-MM-dd\''
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
                    csTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Right to Refuse':
                    csRTR.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Department':
                    csDepartment.initAddForm(formData, tab.gridOptions.data, mainRow);
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Teaching Activity':
                    csTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Right to Refuse':
                    csRTR.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Department':
                    csDepartment.initEditForm(formData, tab.gridOptions.data, row);
            }
        },
        getTabs: function(tabs, row) {
            this.getTeachingActivity(tabs.teachingActivity, row);
            this.getRightToRefuse(tabs.rightToRefuse, row);
            this.getDepartment(tabs.department, row);
        },
        getTeachingActivity: function(teachingActivity, row) {
            $http.get('/contractStaff/getInfo?type=teaching&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    teachingActivity.gridOptions.data = res.data;
                });
        },
        getRightToRefuse: function(rightToRefuse, row) {
            $http.get('/contractStaff/getInfo?type=rightToRefuse&id=' + row.entity.contractStaffID)
                .then(function(res) {
                    rightToRefuse.gridOptions.data = res.data;
                });
        },
        getDepartment: function(department, row) {
            $http.get('/contractStaff/getInfo?type=department&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    department.gridOptions.data = res.data;
                });
        }
    };
});