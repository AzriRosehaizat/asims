application.service('csTabService', function($http, csTA, csRTR) {

    return {
        tabs: function() {
            return {
                teachingActivity: {
                    title: 'Teaching Activity',
                    gridOptions: {
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
                rightToRefuse: {
                    title: 'Right to Refuse',
                    gridOptions: {
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
            }
        },
        getTabs: function(tabs, row) {
            this.getTeachingActivity(tabs.teachingActivity, row);
            this.getRightToRefuse(tabs.rightToRefuse, row);
        },
        getTeachingActivity: function(teachingActivity, row) {
            // $http.get('/contractStaff/getInfo?type=teaching&id=' + row.entity.academicStaffID)
            //     .then(function(res) {
            //         teachingActivity.gridOptions.data = res.data;
            //     });
        },
        getRightToRefuse: function(rightToRefuse, row) {
            // $http.get('/contractStaff/getInfo?type=rightToRefuse&id=' + row.entity.academicStaffID)
            //     .then(function(res) {
            //         rightToRefuse.gridOptions.data = res.data;
            //     });
        },
    };
});