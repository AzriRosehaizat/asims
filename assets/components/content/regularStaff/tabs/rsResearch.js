application.service('rsResearch', function($http, $q, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.researchID = formData.model.title.obj.researchID;
            }
            return $http.put('/RegularStaff_Research/' + formData.model.regularStaffResearchID, formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=research&id=' + res.data.regularStaffID.regularStaffID);
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.researchID = formData.model.title.obj.researchID;
            }
            return $http.post('/RegularStaff_Research', formData.model)
                .then(function(res) {
                    console.log(res.data);
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
                change: {
                    reset: "startDate"
                }
            }, {
                type: "date",
                name: "startDate",
                label: "Start Date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                required: false
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
                url: {
                    start: "/research?where={",
                    end: "\"title\":{\"startsWith\":\""
                },
                link: "application.research",
                output: {
                    obj: {},
                    name: "title"
                },
                change: {
                    reset: "startDate",
                    reset: "endDate"
                }
            }, {
                type: "date",
                name: "startDate",
                label: "Start Date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "endDate",
                required: false
            }];
            formService.init(formData, gridData, row, 'rsResearch', false);
        },
    };
});
