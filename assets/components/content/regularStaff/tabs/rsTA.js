application.service('rsRank', function($http, _, formService) {

    var parentRow;

    return {
        update: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.rankID = formData.model.title.obj.rankID;
            }
            return $http.put('/regularStaff_Rank/' + formData.model.regularStaffRankID, formData.model)
                .then(function(res) {
                    res.data.title = res.data.rankID.title;
                    res.data.rankID = res.data.rankID.rankID;
                    // Update parent row
                    parentRow.entity.Rank = res.data.title;
                    return res;
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.title)) {
                formData.model.rankID = formData.model.title.obj.rankID;
            }
            formData.model.regularStaffID = parentRow.entity.regularStaffID;
            return $http.post('/regularStaff_Rank', formData.model)
                .then(function(res) {
                    return $http.get('/rank/' + res.data.rankID)
                        .then(function(rank) {
                            res.data.title = rank.data.title;
                            // Update parent row, more logic?
                            if (!parentRow.entity.Rank) 
                                parentRow.entity.Rank = res.data.title;
                            return res;
                        });
                });
        },
        delete: function(formData) {
            return $http.delete('/regularStaff_Rank/' + formData.model.regularStaffRankID);
        },
        initAddForm: function(formData, gridData, pRow) {
            parentRow = pRow;
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Rank';
            formData.inputs = [{
                type: "autocomplete",
                name: "title",
                label: "Name",
                url: "/rank?where={\"title\":{\"startsWith\":\"",
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

            formService.setGridData(gridData);
            formService.setFormData(formData, 'rsRank');
        },
        initEditForm: function(formData, row, pRow) {
            parentRow = pRow;
            formService.formatDate(row.entity.startDate);
            formService.formatDate(row.entity.endDate);
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Rank';
            formData.inputs = [{
                type: "autocomplete",
                name: "title",
                label: "Name",
                url: "/rank?where={\"title\":{\"startsWith\":\"",
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

            formService.setRow(row);
            formService.setFormData(formData, 'rsRank');
        },
    };
});