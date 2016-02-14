/**
 * RegularStaffController
 *
 * @description :: Server-side logic for managing Regularstaffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var mysql = require('knex')({
	client: 'mysql'
});

module.exports = {

	getAllRegularStaff: function(req, res) {
		RegularStaffService.getAllRegularStaff({}, function(err, result) {
			if (err) return res.serverError(err);
			return res.ok(result);
		});
	},

	getDepartment: function(req, res) {
		var id = req.param('id');
		RegularStaffService.getDepartment(id, {}, function(err, result) {
			if (err) return res.serverError(err);
			return res.ok(result);
		});
	},
	
	getRank: function(req, res) {
		var id = req.param('id');
		RegularStaffService.getRank(id, {}, function(err, result) {
			if (err) return res.serverError(err);
			return res.ok(result);
		});
	},
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
