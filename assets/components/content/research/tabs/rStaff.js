application.service('rStaff', function($http, _, formService) {
    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/RegularStaff_Research/' + formData.model.regularStaffResearchID, formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=research&id=' + res.data.researchID.researchID + 
                                     '&where=' + res.data.regularStaffResearchID);
                });
        },
        create: function(formData) {
            formData.model.researchID = mainRow.entity.researchID;
            return $http.post('/RegularStaff_Research/', formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=research&id=' + res.data.researchID + 
                                     '&where=' + res.data.regularStaffResearchID);
                });
        },
        delete: function(formData) {
            return $http.delete('/RegularStaff_Research/' + formData.model.regularStaffResearchID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Regular Staff';
            formData.inputs = [{
                type: "autocomplete",
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
                        tag: "",
                        name: "employeeNo"
                    }]
                },
                assign: [{
                    from: "fullName.obj.RegularStaff[0].regularStaffID",
                    to: "regularStaffID"
                }],
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                minDate: "startDate"
            }];

            formService.init(formData, gridData, null, 'rStaff', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);
            row.entity.fullName = row.entity.firstName + ' ' + row.entity.lastName;

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Regular Staff';
            formData.inputs = [{
                type: "text",
                name: "fullName",
                label: "Full name",
                readonly: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                minDate: "startDate"
            }];

            formService.init(formData, gridData, row, 'rStaff', false);
        },
    };
});