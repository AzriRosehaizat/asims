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
				var rasData = {
					academicStaffID: created.academicStaffID,
					contAppDate: req.param('contAppDate'),
					tenureDate: req.param('tenureDate')
				};
				var createdRAS = RegularStaff.create(rasData).then(function(createdRAS) {
					return createdRAS;
				});
				console.log('Created staff with name: ' + created.firstName + " " + created.lastName + ";" + created.academicStaffID);

				return [created, createdRAS];
			}).spread(function(created, createdRAS) {
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
	updateRAS: function(req, res) {
		var academicStaffID = req.param('academicStaffID');
		var data = {
			firstName: req.param('firstName'),
			lastName: req.param('lastName')
		};
		var rasData = {
			regularStaffID: req.param('regularStaffID'),
			contAppDate: req.param('contAppDate'),
			tenureDate: req.param('tenureDate')
		};

		AcademicStaff.update(academicStaffID, data)
			.then(function(updated) {
				var updatedRAS = RegularStaff.update(rasData.regularStaffID, rasData).then(function(updatedRAS) {
					return updatedRAS;
				});
				return [updated, updatedRAS];
			}).spread(function(AcademicStaff, RegularStaff) {
				res.json({
					AcademicStaff, RegularStaff
				});
				console.log("Updated staff successfully for: academicStaffID: " + AcademicStaff.academicStaffID.toString + " and regularStaffID: " + RegularStaff.regularStaffID );

			}).catch(function(err) {
				res.serverError(err);
				console.log(err);
			});
	},
	deleteRAS: function(req, res) {
		var data = {
			regularStaffID: req.param('regularStaffID'),
			academicStaffID: req.param('academicStaffID')
		};
		//Delete child Regular Staff
		RegularStaff.destroy({
			regularStaffID: data.regularStaffID
		}).then(function(deletedRAS) {
			//delete parent AcademicStaff
			var deleted = AcademicStaff.destroy({
				academicStaffID: data.academicStaffID
			}).then(function(deleted) {
				return deleted;
			});
			return [deletedRAS, deleted];
		}).spread(function(RegularStaff, AcademicStaff) {
			res.ok({
				RegularStaff, AcademicStaff
			});
			console.log("Delete staff successfully for: academicStaffID: " + AcademicStaff.academicStaffID + " and regularStaffID: " + RegularStaff.regularStaffID );
		}).catch(function(err) {
			res.serverError();
			console.log("Unable to delete");
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
				console.log("Incorrect REST url");
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
