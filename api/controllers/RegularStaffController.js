module.exports = {
	test: function( request, response ){
		RegularStaffService.find({}, function( error, regularStaff ){
			response.json( error || regularStaff )	
		});
	}
};

