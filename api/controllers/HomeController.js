/*global 
	Home Page Counter 
*/

/**
 * HomePageController
 *
 * @description :: Server-side logic for getting info for the home page
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getInfo: function(req, res) {
		var responseFn = function(err, result) {
			if (err) return res.serverError(err);
			return res.ok(result);
		};
		var date = new Date();
		var data = {
			type: req.param('type')
		};
		switch (data.type) {
			case 'leave':
				HomeService.getLeave(date, responseFn);
				break;
			case 'research':
				HomeService.getResearch(data.id, responseFn);
				break;
			case 'regularStaff':
				HomeService.getRegularStaff(data.id, responseFn);
				break;
			case 'contractStaff':
				HomeService.getContractStaff(data.id, responseFn);
				break;
			default:
				res.serverError();
				console.log("Incorrect REST url");
		}
	}
};
