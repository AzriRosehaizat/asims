application.service('reportService', function(_) {

    this.getStaffInfo = function(info) {
        return {
            columns: [{
                width: 'auto',
                text: 'NAME \nDEPARTMENT \nRANK',
                style: 'sectionHeader'
            }, {
                width: 'auto',
                text: info.name + '\n' + info.department + '\n' + info.rank,
                style: 'section'
            }],
            columnGap: 10
        };
    };

    this.setTable = function(data, widths) {
        var columns = Object.keys(data[0]);

        return {
            table: {
                widths: widths,
                headerRows: 1,
                style: 'table',
                body: setTableBody(data, columns)
            }
        };
    };

    function setTableBody(data, columns) {
        var body = [];
        
        data.forEach(function(row) {
            var dataRow = [];
            
            columns.forEach(function(column) {
                var str = (row[column] !== 0) ? row[column].toString() : '';

                if (_.isNumber(row[column])) {
                    str = {text: str, alignment: 'center'};
                }

                dataRow.push(str);
            });
            
            body.push(dataRow);
        });

        return body;
    }

    this.setFooter = function() {
        return {
            style: 'footerTable',
            table: {
                body: [
                    [{
                        text: "Faculty Member's Signature __________________",
                        style: 'footerSign',
                        margin: [0, 0, 45, 0]
                    }, {
                        text: "Chair's Signature __________________",
                        style: 'footerSign'
                    }],
                    ["", ""],
                    [{
                        style: 'footerNoteTable',
                        table: {
                            widths: [125, 25],
                            body: [
                                [{
                                    text: 'This chart is accurate',
                                    style: 'footNote'
                                }, ''],
                                [{
                                    text: 'Changes have been indicated',
                                    style: 'footNote'
                                }, '']
                            ]
                        }
                    }, {
                        table: {
                            widths: [125, 25],
                            body: [
                                [{
                                    text: 'This chart is accurate',
                                    style: 'footNote'
                                }, ''],
                                [{
                                    text: 'Changes have been indicated',
                                    style: 'footNote'
                                }, '']
                            ]
                        }
                    }]
                ]
            },
            layout: 'noBorders',
        };
    };

    this.setStyle = function() {
        return {
            header: {
                bold: true,
                fontSize: 12,
                margin: [0, 0, 0, 10],
                alignment: "left",
                decoration: 'underline'
            },
            sectionHeader: {
                bold: true,
                fontSize: 11,
                margin: [0, 10, 0, 10]
            },
            section: {
                fontSize: 11,
                margin: [0, 10, 0, 10]
            },
            tableHeader: {
                bold: true,
                fontSize: 11,
                margin: [0, 20, 0, 10]
            },
            table: {
                alignment: "left",
                fontSize: 11,
                margin: [0, 10, 0, 10]
            },
            footerTable: {
                alignment: "left",
                fontSize: 11,
                margin: [0, 50, 0, 10]
            },
            footer: {
                alignment: "left"
            },
            footerSign: {
                fontSize: 11
            },
            footNote: {
                italics: true,
                fontSize: 8
            }
        };
    };
});