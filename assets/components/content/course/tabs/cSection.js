application.service('csSection', function($http, _, formService) {
    var mainRow;

    return {
        update: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.sectionID = formData.model.title.obj.sectionID;
            }
            return $http.put('/Section_Offered/' + formData.model.sectionID, formData.model)
                .then(function(res) {
                    return $http.get('/Section_Offered/' + res.data.sectionID.sectionID)
                        .then(function(section) {
                            res.data.sectionID = section.data.sectionID;
                            res.data.startDate = section.data.startDate;
                            res.data.endDate = section.data.endDate;
                            return res;
                        });
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.departmentID = formData.model.title.obj.departmentID;
            }
            formData.model.academicStaffID = mainRow.entity.academicStaffID;

            return $http.post('/Section_Offered', formData.model)
                .then(function(res) {
                    return $http.get('/Section_Offered/' + res.data.sectionID)
                        .then(function(section) {
                            res.data.departmentCode = section.data.departmentCode;
                            res.data.title = department.data.title;
                            return res;
                        });
                });
        },
        delete: function(formData) {
            return $http.delete('/Course_Section/' + formData.model.academicStaffDepartmentID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Section';
            formData.inputs = [{
                type: "autocomplete",
                name: "title",
                label: "Name",
                url: {
                    start: "/rank?where={",
                    end: "\"title\":{\"startsWith\":\""
                },
                link: "application.rank",
                output: {
                    obj: {},
                    name: "title"
                },
                disabled: false,
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

            formService.init(formData, gridData, null, 'cSection', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Rank';
            formData.inputs = [{
                type: "autocomplete",
                name: "title",
                label: "Name",
                url: {
                    start: "/rank?where={",
                    end: "\"title\":{\"startsWith\":\""
                },
                link: "application.rank",
                output: {
                    obj: {},
                    name: "title"
                },
                disabled: false,
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

            formService.init(formData, gridData, row, 'rsRank', false);
        },
    };
});