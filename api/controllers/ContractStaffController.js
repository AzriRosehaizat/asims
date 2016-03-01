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
			where: req.param('where')
		};
		switch (data.type) {
			case 'teaching':
				ContractStaffService.getTeachingActivity(data.id, data.where, responseFn);
				break;
			case 'rightToRefuse':
				ContractStaffService.getRightToRefuse(data.id, data.where, responseFn);
				break;
			case 'department':
				ContractStaffService.getDepartment(data.id, data.where, responseFn);
				break;
			case 'employment':
				ContractStaffService.getEmployment(data.id, data.where, responseFn);
				break;
			default:
				res.serverError();
				console.log("Incorrect REST url");
		}
	}
};
