/**
 * RegularStaffController
 *
 * @description :: Server-side logic for managing Regularstaffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getRAS: function(req, res){
			RegularStaff.find({ select: ['academicStaffID'] 
			

		}, function(err, RAS){
			if (err) return res.negotiate(err);               //#C
      		return res.json(RAS); 
		});
	}
};

