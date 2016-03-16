application.service('taCASTabService', function($http, taCASTA, rtrCASTA) {

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
                            field: 'courseNo'
                        }, {
                            name: 'Section No.',
                            field: 'sectionNo'
                        }, {
                            name: 'Title',
                            field: 'title'
                        }, {
                            name: 'Term',
                            field: 'term'
                        }, {
                            name: 'Year',
                            field: 'year'
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
                rightToRefuse: {
                    title: 'Right to Refusal',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Dept. Code',
                            field: 'departmentCode'
                        }, {
                            name: 'Course No.',
                            field: 'courseNo'
                        }, {
                            name: 'Section No.',
                            field: 'sectionNo'
                        }, {
                            name: 'Title',
                            field: 'title'
                        }, {
                            name: 'Term',
                            field: 'term'
                        }, {
                            name: 'Year',
                            field: 'year'
                        }]
                    }
                }
            };
        },
        initAddForm: function(formData, tab, mainRow) {
            switch (tab.title) {
                case 'Teaching Activity':
                    taCASTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Right to Refusal':
                    rtrCASTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Teaching Activity':
                    taCASTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Right to Refusal':
                    rtrCASTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
            }
        },
        getTabs: function(tabs, row) {
            this.getTeachingActivity(tabs.teachingActivity, row);
            this.getRightToRefuse(tabs.rightToRefuse, row);
        },
        getTeachingActivity: function(teachingActivity, row) {
            $http.get('/contractStaff/getInfo?type=teaching&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    teachingActivity.gridOptions.data = res.data;
                });
        },
        getRightToRefuse: function(rightToRefuse, row) {
            $http.get('/contractStaff/getInfo?type=rightToRefusal&id=' + row.entity.contractStaffID)
                .then(function(res) {
                    rightToRefuse.gridOptions.data = res.data;
                });
        }
    };
});