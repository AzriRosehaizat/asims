application.service('reportService', function(){
    
    this.getStaffInfo = function(info){
        return {
            text: 'Name: ' + info.name + '\nDepartment: ' + info.department + '\nRank: ' + info.rank,
            style: 'section'
        };
    };
    
    function setTableBody(data, columns){
        var body = [];
        body.push(columns);
        data.forEach(function(row) {
            var dataRow = [];
            columns.forEach(function(column) {
                dataRow.push(row[column].toString());
            });
            body.push(dataRow);
        });
        return body;
    }
    
    this.setTableHead = function(table){
        var column = Object.keys(table);
        return {
            table: {
                headerRows: 1,
                style: table,
                body: setTableBody(table, column)
            }
        };
    };
    
    this.setFooter = function(){
        return {
            style: 'table',
            table: {
                body: [
                    ["Faculty Member's Signature _________________", "Chair's Signature _____________________"],
                    [
                        {
                            table: {
                                widths: [180,50],
                                body: [
                                        ['This chart is accurate', ''],
	                                    ['Changes have been indicated', '']
                                    ]
                            }
                        },
                        {
                            table: {
                                widths: [180,50],
                                body: [
                                        ['This chart is accurate', ''],
	                                    ['Changes have been indicated', '']
                                    ]
                            }
                        }
                    ] 
	            ]
            },
            text: {pageBreak: 'after'},
            layout: 'noBorders',
        };
    };
});