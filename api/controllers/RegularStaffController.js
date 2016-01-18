/**
 * RegularStaffController
 *
 * @description :: Server-side logic for managing Regularstaffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res){
		var selObj = {select: ['academicStaffID']};
		RegularStaff.find(selObj).exec(function ras(err, ras){
	      	if (err) {
    			return res.negotiate(err);
      		} else {
        		return res.json(ras)
      		}
		});
	}
};

