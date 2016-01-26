/**
 * RegularStaffController
 *
 * @description :: Server-side logic for managing Regularstaffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var mysql = require('knex')({client: 'mysql'});


module.exports = {
	//test knex builder and .query method
	//more maintaninable than raw sql
	populateRegularStaff: function( req, res){
		UIGridService.populateRegularStaff( {}, function(err, result){
			if (err) return res.serverError(err);
			return res.ok( result);
		});
	}
};

