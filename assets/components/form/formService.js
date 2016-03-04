application.service('formService', function($injector, $mdDialog, _, toaster, moment) {

    var self = this;
    self.formData = {};
    self.readOnly = false;

    var grid, row, service;
    var mainRow, mainService, isMain;

    self.init = function(formData, gridData, rowData, serviceName, main) {
        self.readOnly = (gridData.readOnly) ? gridData.readOnly : false;

        self.formData = formData;
        grid = gridData;
        row = rowData;
        service = $injector.get(serviceName);
        isMain = main;

        if (isMain) {
            mainRow = rowData;
            mainService = service;
        }
    };

    self.reset = function() {
        self.formData = {};
    };

    self.submit = function(formData) {
        var startDate = formData.model.startDate;
        var endDate = formData.model.endDate;

        if (endDate < startDate && endDate != null) {
            toaster.warning("Start Date has to be greater than End Date");
        }
        else {
            if (formData.isEditing) {
                self.update(row, formData);
            }
            else {
                self.create(grid, formData);
            }
        }
    };

    self.update = function(row, formData) {
        formData.mode = 'indeterminate';

        service.update(formData)
            .then(function(res) {
                if (_.isArray(res.data)) res.data = res.data[0];
                _.merge(row.entity, res.data);
                updateMainRow();

                service.initEditForm(formData, grid, row);
                toaster.done("Updated successfully!");
            }, function(err) {
                toaster.error(err);
            })
            .finally(function(notice) {
                formData.mode = '';
            });
    };

    self.create = function(grid, formData) {
        formData.mode = 'indeterminate';

        service.create(formData)
            .then(function(res) {
                if (_.isArray(res.data)) res.data = res.data[0];
                grid.unshift(res.data);
                updateMainRow();

                var mRow = (isMain) ? null : mainRow;
                service.initAddForm(formData, grid, mRow);
                toaster.done("Added successfully!");
            }, function(err) {
                toaster.error(err);
            })
            .finally(function(notice) {
                formData.mode = '';
            });
    };

    self.cancel = function(formData, form) {
        formData.model = (formData.isEditing) ? _.merge(formData.model, row.entity) : {};
        if (service.cancel) service.cancel(formData);
        resetValidation(form);
    };

    self.delete = function(ev, formData) {
        var confirm = $mdDialog.confirm()
            .title('You are deleting a row')
            .textContent('Are you sure?')
            .clickOutsideToClose(true)
            .targetEvent(ev)
            .ok('Delete')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            formData.mode = 'indeterminate';
            var index = grid.indexOf(row.entity);

            service.delete(formData)
                .then(function(res) {
                    grid.splice(index, 1);
                    updateMainRow();

                    var mRow = (isMain) ? null : mainRow;
                    service.initAddForm(formData, grid, mRow);
                    toaster.done("Deleted successfully!");
                }, function(err) {
                    toaster.error(err);
                })
                .finally(function(notice) {
                    formData.mode = '';
                });
        });
    };

    self.formatDate = function(datef) {
        return (datef) ? (new moment(datef).toDate()) : null;
    };

    function resetValidation(form) {
        form.$setPristine();
        form.$setUntouched();
    }

    function updateMainRow() {
        if (isMain) {
            return;
        }
        else {
            mainService.getRow(mainRow)
                .then(function(res) {
                    _.merge(mainRow.entity, res.data[0]);
                }, function(err) {
                    toaster.error(err);
                });
        }
    }
});