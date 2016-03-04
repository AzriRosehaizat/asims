application.service('csRank', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.rankID = formData.model.title.obj.rankID;
            }
            return $http.put('/contractStaff_Rank/' + formData.model.contractStaffRankID, formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=rank&id=' + formData.model.academicStaffID +
                                     '&where=' + res.data.contractStaffRankID);
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.rankID = formData.model.title.obj.rankID;
            }
            formData.model.academicStaffID = mainRow.entity.academicStaffID;
            formData.model.contractStaffID = mainRow.entity.contractStaffID;
            return $http.post('/contractStaff_Rank', formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=rank&id=' + formData.model.academicStaffID +
                                     '&where=' + res.data.contractStaffRankID);
                });
        },
        delete: function(formData) {
            return $http.delete('/contractStaff_Rank/' + formData.model.contractStaffRankID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Rank';
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
                required: true
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

            formService.init(formData, gridData, null, 'csRank', false);
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
                required: true
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

            formService.init(formData, gridData, row, 'csRank', false);
        },
    };
});