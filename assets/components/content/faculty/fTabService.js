application.service('fTabService', function($http, fDepartment) {

    return {
        tabs: function() {
            return {
                department: {
                    title: 'Department',
                    link: 'application.department',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Code',
                            field: 'departmentCode'
                        }, {
                            name: 'Name',
                            field: 'title'
                        }]
                    },
                    readOnly: true
                }
            };
        },
        initAddForm: function(formData, tab, mainRow) {
            switch (tab.title) {
                case 'Department':
                    tab.gridOptions.data.readOnly = tab.readOnly;
                    fDepartment.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Department':
                    tab.gridOptions.data.readOnly = tab.readOnly;
                    fDepartment.initEditForm(formData, tab.gridOptions.data, row);
                    break;
            }
        },
        getTabs: function(tabs, row) {
            this.getDepartment(tabs.department, row);
        },
        getDepartment: function(department, row) {
            $http.get('/faculty/' + row.entity.facultyID)
                .then(function(res) {
                    department.gridOptions.data = res.data.Department;
                });
        }
    };
});