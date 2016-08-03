/**
 * ContractStaffController
 *
 * @description :: Server-side logic for managing Contractstaffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getAllContractStaff: function(req, res) {
		var contractStaffID = req.param('contractStaffID');
		ContractStaffService.getAllContractStaff(contractStaffID, function(err, result) {
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
				ContractStaffService.getTeachingActivity(data.id, data.where, data.search, responseFn);
				break;
			case 'rightToRefusal':
				ContractStaffService.getRightToRefusal(data.id, data.where, responseFn);
				break;
			case 'department':
				ContractStaffService.getDepartment(data.id, data.where, responseFn);
				break;
			case 'rank':
				ContractStaffService.getRank(data.id, data.where, responseFn);
				break;
			case 'employment':
				ContractStaffService.getEmployment(data.id, data.where, responseFn);
				break;
			default:
				res.serverError();
				console.log("Incorrect REST url");
		}
	},
	createCAS: function(req, res) {
		var aStaffData = {
			firstName: req.param('firstName'),
			lastName: req.param('lastName'),
			employeeNo: req.param('employeeNo')
		};

		AcademicStaff.create(aStaffData).exec(function(err, aStaff) {
			if (err) return res.negotiate(err);

			var cStaffData = {
				academicStaffID: aStaff.academicStaffID
			};

			ContractStaff.create(cStaffData).exec(function(err, cStaff) {
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
								contractStaffID: cStaff.contractStaffID,
								rankID: req.param('rankID'),
								startDate: req.param('rankStartDate'),
								endDate: req.param('rankEndDate')
							};

							ContractStaff_Rank.create(rankData).exec(function(err, rank) {
								if (err) return res.negotiate(err);
								res.json(cStaff);
							});
						}
						else res.json(cStaff);
					});
				}
				else res.json(cStaff);
			});
		});
	}
};
