application.service('rsResearch', function($http, $q, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/RegularStaff_Research/' + formData.model.regularStaffResearchID, formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=research&id=' + res.data.regularStaffID.regularStaffID);
                });
        },
        create: function(formData) {
            return $http.post('/RegularStaff_Research', formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=research&id=' + res.data.regularStaffID + '&where=' + res.data.regularStaffResearchID);
                });
        },
        delete: function(formData) {
            return $http.delete('/RegularStaff_Research/' + formData.model.regularStaffResearchID);
        },
        initAddForm: function(formData, gridData, row) {
            mainRow = row;
            formData.isEditing = false;
            formData.model = _.cloneDeep(row.entity);
            formData.title = 'Add Research Activity';
            formData.inputs = [{
                type: "autocomplete",
                name: "title",
                label: "Research Title",
                url: {
                    start: "/research?where={",
                    end: "\"title\":{\"startsWith\":\""
                },
                link: "application.research",
                output: {
                    obj: {},
                    name: "title"
                },
                assign: [{
                    from: "title.obj.researchID",
                    to: "researchID"
                }, {
                    from: "title.obj.abstract",
                    to: "abstract"
                }],
                required: true
            }, {
                type: "textarea",
                name: "abstract",
                label: "Abstract",
                readonly: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date"
            }];

            formService.init(formData, gridData, row, 'rsResearch', false);

        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Research Activity';
            formData.inputs = [{
                type: "autocomplete",
                name: "title",
                label: "Research Title",
                readonly: true
            }, {
                type: "textarea",
                name: "abstract",
                label: "Abstract",
                readonly: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start Date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End Date"
            }];

            formService.init(formData, gridData, row, 'rsResearch', false);
        },
    };
});
