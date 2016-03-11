application.service('loadChartService', function($mdDialog, _, moment, reportService) {

    var self = this;
    var docDefinition = {
        pageSize: 'LETTER',
        pageMargins: [ 60, 60, 40, 60 ],
        info: {
            title: 'Faculty Load Chart',
            author: 'Auto-generated by Application',
            subject: 'Faculty Load Chart',
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
                templateUrl: 'components/report/loadChart/loadDialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(function(range) {
                // console.log(tabs);
                docDefinition.content = [];

                var data = formatData(entity, tabs, range);
                generateReport(data);
                openPdf();
            });
    };

    function formatData(entity, tabs, range) {
        var data = {};

        /******************** Regular staff information ***********************/
        entity.name = entity.firstName + ' ' + entity.lastName;
        data.info = entity;

        /*************************** Data objects *****************************/
        var loadData = tabs.load.gridOptions.data;
        var reductionData = tabs.loadReduction.gridOptions.data;
        var tActivityData = tabs.teachingActivity.gridOptions.data;
        var overloadData = tabs.overload.gridOptions.data;
        var creditData = tabs.FCECredit.gridOptions.data;
        var debitData = tabs.FCEDebit.gridOptions.data;

        /**************************** Main table ******************************/
        data.main = [];
        data.main.push(buildMainRow('Year', 'Normal Load', 'Reduced Load', 'Actual Teaching Load', 'Owed FCEs', 'Banked FCEs'));

        for (var year = range[0]; year <= range[1]; year++) {

            // Get normal load
            var normal = 0;
            _.forEach(loadData, function(load) {
                if (load.year === year) {
                    normal += load.FCEValue;
                }
            });

            // Get reduced load
            var reduced = normal;
            _.forEach(reductionData, function(reduction) {
                if (reduction.year === year) {
                    reduced -= reduction.FCEValue;
                }
            });

            // Get owed FCEs
            var owed = 0;
            _.forEach(creditData, function(credit) {
                if (moment(credit.dateIssued).year() === year) {
                    owed += credit.FCEValue;
                }
            });

            // Get banked FCEs
            var banked = 0;
            _.forEach(debitData, function(debit) {
                if (moment(debit.dateIssued).year() === year) {
                    banked += debit.FCEValue;
                }
            });

            // Get teaching activity load
            // Get an array of teaching activities for the year
            var TAs = _.filter(tActivityData, function(TA) {
                return TA.year === year;
            });

            // Push first row in the year with all information
            var teaching = (TAs[0]) ? TAs[0].departmentCode + '-' + TAs[0].courseNo + '-' + TAs[0].sectionNo + '(' + TAs[0].term + ')' : '';
            data.main.push(buildMainRow(year, normal, reduced, teaching, owed, banked));
            // remove the first element
            TAs.shift();

            // Push other rows with only teaching information
            _.forEach(TAs, function(TA) {
                teaching = TA.departmentCode + '-' + TA.courseNo + '-' + TA.sectionNo + '(' + TA.term + ')';
                data.main.push(buildMainRow('', '', '', teaching, '', ''));
            });
        }

        /*********************** Overload course table ************************/
        data.overload = [];
        data.overload.push(buildOverloadRow('Year', 'Term', 'FCEs', 'Course number/section', 'Amount paid'));

        for (var year = range[0]; year <= range[1]; year++) {

            _.forEach(overloadData, function(o) {
                if (o.year === year) {
                    var courseSection = o.departmentCode + '-' + o.courseNo + '-' + o.sectionNo;
                    data.overload.push(buildOverloadRow(year, o.term, o.FCEValue, courseSection, '$' + o.amount));
                }
            });
        }

        /*********************** Load reduction table *************************/
        data.reduction = [];
        data.reduction.push(buildReductionRow('Year', 'Date', 'Reason', 'Reduction in FCEs'));

        for (var year = range[0]; year <= range[1]; year++) {

            _.forEach(reductionData, function(r) {
                if (r.year === year) {
                    data.reduction.push(buildReductionRow(year, r.dateIssued, r.description, r.FCEValue));
                }
            });
        }

        return data;
    }

    function buildMainRow(year, normal, reduced, teaching, owed, banked) {
        return {
            year: year,
            normal: normal,
            reduced: reduced,
            teaching: teaching,
            owed: owed,
            banked: banked
        };
    }

    function buildOverloadRow(year, term, FCEs, courseSection, amount) {
        return {
            year: year,
            term: term,
            FCEs: FCEs,
            courseSection: courseSection,
            amount: amount
        };
    }

    function buildReductionRow(year, date, reason, reduction) {
        return {
            year: year,
            date: date,
            reason: reason,
            reduction: reduction
        };
    }

    function generateReport(data) {
        docDefinition.content.push({
                text: 'FACULTY LOAD CHART',
                style: 'header'
            },
            reportService.getStaffInfo(data.info),
            reportService.setTable(data.main), {
                text: "Overload Teaching",
                style: "tableHeader"
            },
            reportService.setTable(data.overload), {
                text: "Load Reduction",
                style: "tableHeader"
            },
            reportService.setTable(data.reduction),
            reportService.setFooter()
        );
    }

    function openPdf() {
        pdfMake.createPdf(docDefinition).open();
    }
});