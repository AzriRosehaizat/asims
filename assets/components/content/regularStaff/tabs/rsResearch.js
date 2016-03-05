application.service('rsResearch', function($http, $q, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            if (_.isObject(formData.model.researchID)) {
                formData.model.researchID  = formData.model.researchID.obj.researchID;
            }
            return $http.put('/RegularStaff_Research/' + formData.model.researchID, formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=research&id=' + res.data.researchID.regularStaffID );
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.researchID)) {
                formData.model.researchID = mainRow.entity.researchID;
            }
            return $http.post('/RegularStaff_Research', formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=research&id=' + res.data.researchID );
                });
        },
        delete: function(formData) {
            return $http.delete('/RegularStaff_Research/' + formData.model.researchID);
        },
        initAddForm: function(formData, gridData, row) {
            mainRow = row;

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Add Research Activity';
            formData.inputs = [{
                type: "autocomplete",
                name: "researchID",
                label: "Research ID",
                url: {
                    start: "/research?where={",
                    end: "\"researchID\":{\"startsWith\":\""},
                link: "application.research",
                output: {
                    obj: {},
                    name: "researchID"
                },
                change: {
                    reset: "startDate",
                    reset: "endDate"
                }}, {
                type: "date",
                name: "startDate",
                label: "Start Date",
                required: true
                }, {
                type: "date",
                name: "endDate",
                label: "endDate",
                required: false}
            ];

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
                name: "researchID",
                label: "Research ID",
                url: {
                    start: "/research?where={",
                    end: "\"researchID\":{\"startsWith\":\""},
                link: "application.research",
                output: {
                    obj: {},
                    name: "researchID"
                },
                change: {
                    reset: "startDate",
                    reset: "endDate"
                }}, {
                type: "date",
                name: "startDate",
                label: "Start Date",
                required: true
                }, {
                type: "date",
                name: "endDate",
                label: "endDate",
                required: false}
            ];
            formService.init(formData, gridData, row, 'rsResearch', false);
        },
    };
});