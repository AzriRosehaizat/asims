/**
 * RegularStaffController
 *
 * @description :: Server-side logic for managing Regularstaffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find : function( req, res ){
	    RegularStaffService.find( {}, {}, 
	        function( error, regularStaff){
	            res.json(regularStaff);
	        }
	    );
	}
};

