/**
 * RegularStaffController
 *
 * @description :: Server-side logic for managing Regularstaffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//ToDo: Abstract to Service
	createRAS: function(req, res) {
		var data = {
			firstName: req.param('firstName'),
			lastName: req.param('lastName')
		};

		AcademicStaff.create(data)
			.then(function(created) {
				console.log('Created staff with name: ' + created.firstName + " " + created.lastName + ";" + created.academicStaffID);
				// return created.academicStaffID
				return created;
			}).then(function(created) {
				var rasData = {
					academicStaffID: created.academicStaffID,
					contAppDate: req.param('contAppDate'),
					tenureDate: req.param('tenureDate')
				};
				var createdRAS = RegularStaff.create(rasData).then(function(createdRAS){
					return createdRAS
				});
				return [created, createdRAS]
			}).spread(function(created, createdRAS){
				res.json({
					created,
					createdRAS
				});
			})
			.catch(function(err) {
				res.serverError(err);
				console.log(err);
			});
	},
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
			case 'leave':
				//code
				break;
			default:
				res.serverError();
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
