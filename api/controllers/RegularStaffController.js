
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
	getAllRegularStaff: function( req, res){
		RegularStaffService.getAllRegularStaff( {}, function(err, result){
			if (err) return res.serverError(err);
			return res.ok( result);
		});
	}
};



// module.exports = {
// 	test: function(request, response) {
// 		var data = {
// 			startID: request.param('startID'),
// 			limit: request.param('limit')
// 		};

// 		RegularStaffService.find(data, function(error, regularStaff) {
// 			response.json(error || regularStaff);
// 		});
// 	},

// 	count: function(req, res) {
// 		RegularStaff.count().exec(function countCB(err, found) {
// 			res.json(err || found);
// 		});
// 	}
// };
