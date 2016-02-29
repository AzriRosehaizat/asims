application.service('formService', function($injector, $mdDialog, $mdSidenav, _, toaster, moment) {

    this.formData = {};
    var grid, row, service;
    var mainRow, mainService, isMain;

    this.init = function(formData, gridData, rowData, serviceName, main) {
        this.formData = formData;
        grid = gridData;
        row = rowData;
        service = $injector.get(serviceName);
        isMain = main;

        if (isMain) {
            mainRow = rowData;
            mainService = service;
        }

        $mdSidenav('right').then(function(instance) {
            toggleRight(instance);
        });
    };

    this.reset = function() {
        this.formData = {};
    };

    this.submit = function(formData) {
        if (formData.isEditing) {
            this.update(row, formData);
        }
        else {
            this.create(grid, formData);
        }
    };

    this.update = function(row, formData) {
        formData.mode = 'indeterminate';

        service.update(formData)
            .then(function(res) {
                if (_.isArray(res.data)) {
                    res.data = res.data[0];
                }
                _.merge(row.entity, res.data);
                updateMainRow();

                toaster.done("Updated successfully!");
            }, function(err) {
                toaster.error(err);
            })
            .finally(function(notice) {
                formData.mode = '';
            });
    };

    this.create = function(grid, formData) {
        formData.mode = 'indeterminate';

        service.create(formData)
            .then(function(res) {
                if (_.isArray(res.data)) {
                    res.data = res.data[0];
                }
                console.log(res.data);
                grid.unshift(res.data);
                updateMainRow();

                formData.model = {};
                resetValidation(formData);
                toaster.done("Added successfully!");
            }, function(err) {
                toaster.error(err);
            })
            .finally(function(notice) {
                formData.mode = '';
            });
    };

    this.cancel = function(formData) {
        if (formData.isEditing) {
            _.merge(formData.model, row.entity);
        }
        else {
            formData.model = {};
        }
        resetValidation(formData);
        // Do something specific
        if (service.cancel) service.cancel(formData);
    };

    this.delete = function(ev, formData) {
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
                    resetValidation(formData);
                    toaster.done("Deleted successfully!");
                }, function(err) {
                    toaster.error(err);
                })
                .finally(function(notice) {
                    formData.mode = '';
                });
        });
    };

    this.formatDate = function(datef) {
        return (datef) ? (new moment(datef).toDate()) : null;
    };

    function resetValidation(formData) {
        formData.form.$setPristine();
        formData.form.$setUntouched();
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

    function toggleRight(instance) {
        console.log(instance);
        if (!instance.isLockedOpen()) {
            instance.toggle().then(function() {
                console.log("toggled");
            });
        }
    }
});