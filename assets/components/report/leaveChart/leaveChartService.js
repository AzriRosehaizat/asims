application.service('leaveChartService', function($mdDialog, _, moment, reportService) {

    var self = this;
    var docDefinition = {
        pageSize: 'LETTER',
        pageMargins: [60, 60, 40, 60],
        info: {
            title: 'Leave Entitlement Chart',
            author: 'Auto-generated by Application',
            subject: 'Leave Entitlement Chart',
        },
        content: [],
        defaultStyle: {
            font: Object.keys(pdfMake.fonts)[0],
            fontSize: 11
        },
        styles: reportService.setStyle()
    };

    self.openLoadDialog = function(ev, entity, tabs) {
        $mdDialog.show({
                controller: 'dialogController as ctrl',
                templateUrl: 'components/report/dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    title: "leave chart"
                },
                clickOutsideToClose: true
            })
            .then(function(range) {
                docDefinition.content = [];

                var data = formatData(entity, tabs, range);
                generateReport(data);
                openPdf();
            });
    };

    function formatData(entity, tabs, range) {
        var data = {};
        // Convert academic year to interger year
        var startYear = getYear(range[0]);
        var endYear = getYear(range[1]);

        /******************** Regular staff information ***********************/
        entity.name = entity.firstName + ' ' + entity.lastName;
        data.info = entity;

        /*************************** Data objects *****************************/
        var creditData = _.sortBy(tabs.credits.gridOptions.data, 'startDate');
        var debitData = _.sortBy(tabs.debits.gridOptions.data, 'startDate');

        /**************************** Main table ******************************/
        data.main = [];
        data.main.push(buildMainRow('Leaves Taken', 'Leave Period'));

        // Get leaves taken
        _.forEach(debitData, function(debit) {
            var taken = debit.leaveDebitType + ' leave';
            var startDate = (debit.startDate) ? moment(debit.startDate).format('MMM D, YYYY') : '';
            var endDate = (debit.endDate) ? moment(debit.endDate).format('MMM D, YYYY') : '';
            var wage = (debit.wagePercentage) ? ' at ' + debit.wagePercentage + '%' : '';
            var period = startDate + '~' + endDate + wage;
            data.main.push(buildMainRow(taken, period));
        });

        for (var year = startYear; year <= endYear; year++) {

        }

        return data;
    }

    function getYear(academicYear) {
        return parseInt(academicYear.slice(0, 4), 10);
    }

    function getAcademicYear(year) {
        var nextYear = (year + 1).toString().slice(2);
        return year.toString() + '-' + nextYear;
    }

    function buildMainRow(leaveTaken, leavePeriod) {
        return {
            taken: leaveTaken,
            period: leavePeriod
        };
    }

    function generateReport(data) {
        docDefinition.content.push({
                text: 'LEAVE ENTITLEMENT CHART',
                style: 'header'
            },
            reportService.getStaffInfo(data.info),
            reportService.setTable(data.main), 
            {
                text: "Credits Accumilated Towards next Research Leave",
                style: "tableHeader"
            },
            // reportService.setTable(data.RS), 
            {
                text: "Credits Accumilated Towards next Admin Leave",
                style: "tableHeader"
            },
            // reportService.setTable(data.Admin), 
            {
                text: 'As outline in Clause 26.14, Members shall make applications to the Chair by October 1st for leaves ' + 'commencing the following academic year. Please adhere to the dealine to ensure the Research/Study Leave ' + 'Committee has sufficient time to consider your application.' + '\n\n I HAVE READ THE ABOVE. \n\n',
                style: 'tableHeader'
            },
            reportService.setFooter()
        );
    }

    function openPdf() {
        pdfMake.createPdf(docDefinition).open();
    }
});