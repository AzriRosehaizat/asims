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
			}).spread(function(AcademicStaff, RegularStaff) {
				res.json({
					academicStaffID: AcademicStaff.academicStaffID,
					firstName: AcademicStaff.firstName,
					lastName: AcademicStaff.lastName,
					employeeNo: AcademicStaff.employeeNo,
					regularStaffID: RegularStaff.regularStaffID,
					contAppDate: RegularStaff.contAppDate,
					tenureDate: RegularStaff.tenureDate
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
				console.log("Updated successfully for academicStaffID: " + updated[0].academicStaffID + updated[0].firstName + " " + updated[0].lastName);
				return [updated, updatedRAS];
			}).spread(function(AcademicStaff, RegularStaff) {
				res.json({
					academicStaffID: AcademicStaff[0].academicStaffID,
					firstName: AcademicStaff[0].firstName,
					lastName: AcademicStaff[0].lastName,
					employeeNo: AcademicStaff[0].employeeNo,
					regularStaffID: RegularStaff[0].regularStaffID,
					contAppDate: RegularStaff[0].contAppDate,
					tenureDate: RegularStaff[0].tenureDate
				});

			}).catch(function(err) {
				res.serverError(err);
				console.log(err);
			});
	},
	deleteRAS: function(req, res) {
		//request for all params to avoid error.
		var data = req.allParams();
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
			res.json({
				academicStaffID: AcademicStaff[0].academicStaffID,
				firstName: AcademicStaff[0].firstName,
				lastName: AcademicStaff[0].lastName,
				employeeNo: AcademicStaff[0].employeeNo,
				regularStaffID: RegularStaff[0].regularStaffID,
				contAppDate: RegularStaff[0].contAppDate,
				tenureDate: RegularStaff[0].tenureDate
			});
			console.log("Delete staff successfully for: academicStaffID: " + AcademicStaff[0].academicStaffID + " and regularStaffID: " + RegularStaff[0].regularStaffID);
		}).catch(function(err) {
			res.serverError(err);
			console.log(err);
			console.log("Unable to delete");
		});
	},
	getAllRegularStaff: function(req, res) {
		var	regularStaffID = req.param('regularStaffID');
		RegularStaffService.getAllRegularStaff(regularStaffID, function(err, result) {
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
			case 'teaching':
				RegularStaffService.getTeachingActivity(data.id, responseFn)
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
