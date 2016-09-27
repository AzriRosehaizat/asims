application.service('rsRank', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/regularStaff_Rank/' + formData.model.regularStaffRankID, formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=rank&id=' + formData.model.academicStaffID +
                                     '&where=' + res.data.regularStaffRankID);
                });
        },
        create: function(formData) {
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
            formData.title = 'Rank';
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
                assign: [{
                    from: "title.obj.rankID",
                    to: "rankID"
                }],
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start Date" 
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                minDate: "startDate"
            }];

            formService.init(formData, gridData, null, 'rsRank', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Rank';
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
                assign: [{
                    from: "title.obj.rankID",
                    to: "rankID"
                }],
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start Date"
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                minDate: "startDate"
            }];

            formService.init(formData, gridData, row, 'rsRank', false);
        },
    };
});
