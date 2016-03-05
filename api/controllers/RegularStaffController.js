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
			where: req.param('where')
		};
		switch (data.type) {
			case 'teaching':
				RegularStaffService.getTeachingActivity(data.id, data.where, responseFn);
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
			default:
				res.serverError();
				console.log("Incorrect REST url");
		}
	}
};
