application.service('fTabService', function($http, fDepartment) {

    return {
        tabs: function() {
            return {
                department: {
                    title: 'Department',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Code',
                            field: 'departmentCode'
                        }, {
                            name: 'Name',
                            field: 'title'
                        },{
                            name: 'Description',
                            field: 'description'
                        }]
                    }
                }
            };
        },
        initAddForm: function(formData, tab, mainRow) {
            switch (tab.title) {
                case 'Department':
                    fDepartment.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Department':
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