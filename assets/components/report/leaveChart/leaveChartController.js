application.controller('leaveChartController', function($scope, $http, reportService){
    var docDefinition = {
        info: {
            title: 'Leave Entitlement Chart',
            author: 'Auto-generated by Application',
            subject: 'Leave Entitlement Chart',
          },
        content: [
            ],
        styles: {
        	header: {
        		fontSize: 18,
        		bold: true,
        		alignment: "center"
        	},
        	section: {
        		fontSize: 15,
        		bold: true,
        		margin: [0, 5, 0, 5]
        	},
        	table: {
        	    alignment: "center",
        		margin: [0, 5, 0, 15]
        	},
        	tableHeader: {
        		bold: true,
        		fontSize: 13,
        		color: 'black'
        	}
        }
    };
    
    function generateReport(data){
        docDefinition.content.push(
            { 
    			text: 'LEAVE ENTITLEMENT CHART', 
    			style: 'header' 
    		},
            //reportService.getStaffInfo(info),
            //reportService.setTableHead(load),
            {
    		    text: "Credits Accumilated Towards next Research Leave",
    		    style: "tableHeader"
    		},
    		//reportService.setTableHead(load),
    		{
    		    text: "Credits Accumilated Towards next Admin Leave",
    		    style: "tableHeader"
    		},
    		//reportService.setTableHead(load),
    		{
    		    text: 'As outline in Clause 26.14, Members shall make applications to the Chair by October 1st for leaves '
    		    + 'commencing the following academic year. Please adhere to the dealine to ensure the Research/Study Leave '
    		    + 'Committee has sufficient time to consider your application.'
    		    + '\n\n I HAVE READ THE ABOVE. \n\n',
    		    style: 'tableHeader'
    		},
            reportService.setFooter()
        );
    }
    
    $scope.openPdf = function(){
        $http.get('')
            .success(function(data){
                angular.forEach(data.regularStaff, function(){
                   generateReport(data); 
                });
                pdfMake.createPdf(docDefinition).open();
            })
            .error(function(data){
                
            });
    };
    
});