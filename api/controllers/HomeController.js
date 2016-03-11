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
		var data = {
			type: req.param('type')
		};
		switch (data.type) {
			case 'leave':
				HomeService.getLeave(responseFn);
				break;
			case 'research':
				HomeService.getResearch(responseFn);
				break;
			case 'regularStaff':
				HomeService.getRegularStaff(responseFn);
				break;
			case 'contractStaff':
				HomeService.getContractStaff(responseFn);
				break;
			default:
				res.serverError();
				console.log("Incorrect REST url");
		}
	}
};
