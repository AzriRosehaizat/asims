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
		RegularStaffService.getAllRegularStaff(function(err, result) {
			if (err) return res.serverError(err);
			return res.ok(result);
		});
	},
	getInfo: function(req, res) {
		var responseFn = function(err, result) {
			if (err) return res.serverError(err);
			return res.ok(result);
		};
		var data = {
			id: req.param('id'),
			type: req.param('type')
		};
		switch (data.type) {
			case 'department':
				RegularStaffService.getDepartment(data.id, responseFn)
				break;
			case 'rank':
				RegularStaffService.getRank(data.id, responseFn)
				break;			
			case 'employment':
				RegularStaffService.getEmployment(data.id, responseFn)
				break;
			default:
				console.log("Incorrect REST url")
		}
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
