application.service('dChair', function($http, _, formService) {
    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/Chair/' + formData.model.chairID, formData.model)
                .then(function(res) {
                    return $http.get('/department/getInfo?type=chair&id=' + res.data.departmentID.departmentID + '&where=' + res.data.chairID);
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.fullName)) {
                formData.model.regularStaffID = formData.model.fullName.obj.RegularStaff[0].regularStaffID;
                formData.model.departmentID = mainRow.entity.departmentID;
            }
            return $http.post('/Chair', formData.model)
                .then(function(res) {
                    return $http.get('/department/getInfo?type=chair&id=' + res.data.departmentID + '&where=' + res.data.chairID);
                });
                
                
                
        },
        delete: function(formData) {
            return $http.delete('/Chair/' + formData.model.chairID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Chair';
            formData.inputs = [{
                type: "acCustom",
                name: "fullName",
                label: "Full name",
                url: {
                    start: "/academicStaff/searchFullName?type=RegularStaff&where={",
                    end: "\"fullName\":{\"startsWith\":\"",
                },
                link: "application.regularStaff",
                output: {
                    obj: {},
                    name: "fullName",
                    meta: [{
                        tag: "Employee Num:",
                        name: "employeeNo"
                    }]
                },
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, null, 'dChair', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);
            row.entity.fullName = row.entity.firstName + ' ' + row.entity.lastName;
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Chair';
            formData.inputs = [{
                type: "text",
                name: "fullName",
                label: "Full name",
                readonly: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, row, 'dChair', false);
        },
    };
});