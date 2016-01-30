module.exports = {
	test: function( request, response ){
		var data = {
			startID: request.param( 'startID' ),
			limit: request.param( 'limit' )
		};
		RegularStaffService.find( data , function( error, regularStaff ){
			response.json( error || regularStaff );	
		});
	}
};

