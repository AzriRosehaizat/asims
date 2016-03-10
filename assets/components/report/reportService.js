application.service('reportService', function() {

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

    this.setTable = function(data) {
        var columns = Object.keys(data[0]);

        return {
            table: {
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
                if (row[column] === 0) row[column] = '';
                dataRow.push(row[column].toString());
            });
            body.push(dataRow);
        });

        return body;
    }

    this.setFooter = function() {
        return {
            style: 'footer',
            table: {
                body: [
                    ["Faculty Member's Signature _________________", "Chair's Signature ____________________________"],
                    [{
                        table: {
                            widths: [180, 50],
                            body: [
                                ['This chart is accurate', ''],
                                ['Changes have been indicated', '']
                            ]
                        }
                    }, {
                        table: {
                            widths: [180, 50],
                            body: [
                                ['This chart is accurate', ''],
                                ['Changes have been indicated', '']
                            ]
                        }
                    }]
                ]
            },
            layout: 'noBorders'
        };
    };

    this.setStyle = function() {
        return {
            header: {
                bold: true,
                fontSize: 18,
                alignment: "center"
            },
            sectionHeader: {
                bold: true,
                fontSize: 12,
                margin: [0, 10, 0, 10]
            },
            section: {
                fontSize: 12,
                margin: [0, 10, 0, 10]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                margin: [0, 20, 0, 10],
                color: 'black'
            },
            table: {
                alignment: "center",
                margin: [0, 10, 0, 10]
            },
            footer: {
                alignment: "center",
                margin: [0, 40, 0, 10]
            }
        };
    };
});