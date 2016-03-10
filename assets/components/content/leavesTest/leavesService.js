application.service('leavesService', function($http, _, formService) {

    return {
        gridOptions: function() {
            return {
                columnDefs: [{
                    name: 'First Name',
                    field: 'firstName'
                }, {
                    name: 'Last Name',
                    field: 'lastName'
                }, {
                    name: 'Department',
                    field: 'departmentCode'
                }, {
                    name: 'Rank',
                    field: 'rank'
                }, {
                    name: 'Tenure Date',
                    field: 'tenureDate',
                    cellFilter: 'date:\'MM-dd-yyyy\''
                }, {
                    name: 'Cont\' appointment date',
                    field: 'contAppDate',
                    cellFilter: 'date:\'MM-dd-yyyy\''
                }],
                readOnly: true
            };
        },
        update: function(formData) {
            // return $http.post('/regularStaff/updateRAS', formData.model);
        },
        create: function(formData) {
            // return $http.post('/regularStaff/createRAS', formData.model);
        },
        delete: function(formData) {
            // return $http.post('/regularStaff/deleteRAS', formData.model);
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Regular Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                readonly: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                readonly: true
            }, {
                type: "date",
                name: "tenureDate",
                label: "Tenure date",
                readonly: true
            }, {
                type: "date",
                name: "contAppDate",
                label: "Cont' appointment date",
                readonly: true
            }];

            gridData.readOnly = this.gridOptions().readOnly;
            formService.init(formData, gridData, null, 'leavesService', true);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.tenureDate = formService.formatDate(row.entity.tenureDate);
            row.entity.contAppDate = formService.formatDate(row.entity.contAppDate);
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Regular Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                readonly: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                readonly: true
            }, {
                type: "date",
                name: "tenureDate",
                label: "Tenure date",
                readonly: true
            }, {
                type: "date",
                name: "contAppDate",
                label: "Cont' appointment date",
                readonly: true
            }];

            gridData.readOnly = this.gridOptions().readOnly;
            formService.init(formData, gridData, row, 'leavesService', true);
        },
        getRow: function(row) {
            return $http.get('/regularStaff/getAllRegularStaff/' + row.entity.regularStaffID);
        }
    };
});