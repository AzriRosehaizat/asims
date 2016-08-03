application.service('contractStaffService', function($http, $q, _, formService) {

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
                    name: 'Employee No.',
                    field: 'employeeNo'
                }, {
                    name: 'Department',
                    field: 'departmentCode'
                }, {
                    name: 'Rank',
                    field: 'rank'
                }]
            };
        },
        update: function(formData) {
            return $http.put('/academicStaff/' + formData.model.academicStaffID, formData.model);
        },
        create: function(formData) {
            return $http.post('/contractStaff/createCAS', formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getAllContractStaff/' + res.data.contractStaffID);
                });
        },
        delete: function(formData) {
            return $http.delete('/contractStaff/' + formData.model.contractStaffID)
                .then(function(res) {
                    return $http.delete('/academicStaff/' + formData.model.academicStaffID);    
                });
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Contract Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First Name",
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last Name",
                required: true
            }, {
                type: "text",
                name: "employeeNo",
                label: "Employee No."
            }, {
                type: "autocomplete",
                name: "department",
                label: "Department",
                url: {
                    start: "/department?where={",
                    end: "\"title\":{\"startsWith\":\""
                },
                link: "application.department",
                output: {
                    obj: {},
                    name: "title"
                },
                assign: [{
                    from: "department.obj.departmentID",
                    to: "deptID"
                }],
                reset: ["rank", "rankID"]
            }, {
                type: "date",
                name: "deptStartDate",
                label: "Dept. Start Date",
                hide: "fs.form.department.$pristine",
                required: "fs.form.department.$dirty"
            }, {
                type: "date",
                name: "deptEndDate",
                label: "Dept. End Date",
                minDate: "deptStartDate",
                hide: "fs.form.department.$pristine"
            }, {
                type: "autocomplete",
                name: "rank",
                label: "Rank",
                url: {
                    start: "/rank?where={",
                    end: "\"title\":{\"startsWith\":\""
                },
                link: "application.rank",
                output: {
                    obj: {},
                    name: "title"
                },
                assign: [{
                    from: "rank.obj.rankID",
                    to: "rankID"
                }],
                disabled: "!fs.formData.model.deptID"
            }, {
                type: "date",
                name: "rankStartDate",
                label: "Rank Start Date",
                hide: "fs.form.rank.$pristine",
                required: "fs.form.rank.$dirty"
            }, {
                type: "date",
                name: "rankEndDate",
                label: "Rank End Date",
                minDate: "rankStartDate",
                hide: "fs.form.rank.$pristine"
            }];

            formService.init(formData, gridData, null, 'contractStaffService', true);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Contract Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First Name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last Name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "employeeNo",
                label: "Employee No.",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, row, 'contractStaffService', true);
        },
        getRow: function(row) {
            return $http.get('/contractStaff/getAllContractStaff/' + row.entity.contractStaffID);
        }
    };
});