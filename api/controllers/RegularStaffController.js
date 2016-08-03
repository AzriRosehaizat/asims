/*global 
	AcademicStaff 
	RegularStaff 
	RegularStaffService 
*/

/**
 * RegularStaffController
 *
 * @description :: Server-side logic for managing Regularstaffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getAllRegularStaff: function(req, res) {
		var regularStaffID = req.param('regularStaffID');
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
			type: req.param('type'),
			where: req.param('where'),
			search: req.param('search')
		};
		switch (data.type) {
			case 'teaching':
				RegularStaffService.getTeachingActivity(data.id, data.where, data.search, responseFn);
				break;
			case 'overload':
				RegularStaffService.getOverload(data.id, data.where, responseFn);
				break;
			case 'department':
				RegularStaffService.getDepartment(data.id, data.where, responseFn);
				break;
			case 'rank':
				RegularStaffService.getRank(data.id, data.where, responseFn);
				break;
			case 'employment':
				RegularStaffService.getEmployment(data.id, data.where, responseFn);
				break;
			case 'leaveCredits':
				RegularStaffService.getLeaveCredits(data.id, data.where, responseFn);
				break;
			case 'leaveDebits':
				RegularStaffService.getLeaveDebits(data.id, data.where, responseFn);
				break;
			case 'research':
				RegularStaffService.getResearch(data.id, data.where, responseFn);
				break;
			case 'researchStaff':
				RegularStaffService.getResearchStaff(data.id, data.where, responseFn);
				break;

			default:
				res.serverError();
				console.log("Incorrect REST url");
		}
	},
	createRAS: function(req, res) {
		var aStaffData = {
			firstName: req.param('firstName'),
			lastName: req.param('lastName'),
			employeeNo: req.param('employeeNo')
		};

		AcademicStaff.create(aStaffData).exec(function(err, aStaff) {
			if (err) return res.negotiate(err);

			var rStaffData = {
				academicStaffID: aStaff.academicStaffID,
				contAppDate: req.param('contAppDate'),
				tenureDate: req.param('tenureDate')
			};

			RegularStaff.create(rStaffData).exec(function(err, rStaff) {
				if (err) return res.negotiate(err);
				if (req.param('deptID')) {

					var deptData = {
						academicStaffID: aStaff.academicStaffID,
						departmentID: req.param('deptID'),
						startDate: req.param('deptStartDate'),
						endDate: req.param('deptEndDate')
					};

					AcademicStaff_Department.create(deptData).exec(function(err, dept) {
						if (err) return res.negotiate(err);
						if (req.param('rankID')) {

							var rankData = {
								regularStaffID: rStaff.regularStaffID,
								rankID: req.param('rankID'),
								startDate: req.param('rankStartDate'),
								endDate: req.param('rankEndDate')
							};

							RegularStaff_Rank.create(rankData).exec(function(err, rank) {
								if (err) return res.negotiate(err);
								res.json(rStaff);
							});
						}
						else res.json(rStaff);
					});
				}
				else res.json(rStaff);
			});
		});
	}
};
