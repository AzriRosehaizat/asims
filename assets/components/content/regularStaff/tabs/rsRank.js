application.service('rsRank', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.rankID = formData.model.title.obj.rankID;
            }
            return $http.put('/regularStaff_Rank/' + formData.model.regularStaffRankID, formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=rank&id=' + formData.model.academicStaffID +
                                     '&where=' + res.data.regularStaffRankID);
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.rankID = formData.model.title.obj.rankID;
            }
            formData.model.academicStaffID = mainRow.entity.academicStaffID;
            formData.model.regularStaffID = mainRow.entity.regularStaffID;
            return $http.post('/regularStaff_Rank', formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=rank&id=' + formData.model.academicStaffID +
                                     '&where=' + res.data.regularStaffRankID);
                });
        },
        delete: function(formData) {
            return $http.delete('/regularStaff_Rank/' + formData.model.regularStaffRankID);
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

            formService.init(formData, gridData, null, 'rsRank', false);
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