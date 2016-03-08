application.service('taRASTabService', function($http, taRASTA, overloadRASTA) {

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
                overload: {
                    title: 'Overload',
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
                            name: 'Amount',
                            field: 'amount',
                            cellFilter: 'currency'
                        }]
                    }
                }
            };
        },
        initAddForm: function(formData, tab, mainRow) {
            switch (tab.title) {
                case 'Teaching Activity':
                    taRASTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Overload':
                    overloadRASTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Teaching Activity':
                    taRASTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Overload':
                    overloadRASTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
            }
        },
        getTabs: function(tabs, row) {
            this.getTeachingActivity(tabs.teachingActivity, row);
            this.getOverload(tabs.overload, row);
        },
        getTeachingActivity: function(teachingActivity, row) {
            $http.get('/regularStaff/getInfo?type=teaching&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    teachingActivity.gridOptions.data = res.data;
                });
        },
        getOverload: function(overload, row) {
            $http.get('/regularStaff/getInfo?type=overload&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    overload.gridOptions.data = res.data;
                });
        }
    };
});