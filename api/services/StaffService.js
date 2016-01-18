
/**
 * UserController.js 
 * 
 * @module      :: Service
 * @description :: Provide services for staff related methods
 *                 
 *                
 */

module.export = {
	/**
	* Return a list of all RAS ID
	* @req:
	* 		type: type of AcademicStaff
	* @
	* @res list of all RAS ID
	*/
	getStaff: function(req, res){
		var type = req.param('type').toLowerCase();
		var selObj = {select: ['academicStaffID']};
		var cbHell = function (err, staff){
			if (err) return res.negotiate(err);           
	  		return res.json(staff); 
		};
		console.log(type);
		if (type ===  "ras")
			RegularStaff.find(selObj, cbHell);
		else if (type === "cas")
			ContractStaff.find(selObj, cbHell);
		else
			RegularStaff.find(selObj, cbHell);
	},

	//Get department given a related staff ID
	getDepartment: function(req, res){
		AcademicStaff.findOne({staffID: 1})
		.then(function(AcademicStaff){
			if(AcademicStaff===undefined)
			return res.json({notFound:true});
			//Get departments
			var departments = AcademicStaff_Department.find( { staffID : AcademicStaff.staffID } ).populate('departmentID').then( function(departments){
	                console.log(departments);
	                return departments;
	        });
			return [AcademicStaff.staffID, AcademicStaff.firstName, AcademicStaff.lastName, departments];

		}).spread( function(staffID, firstName, lastName, departments ){
	        res.json({
	        	'staffID': staffID,
	            'firstName': firstName, 
	          	'lastName': lastName,
	            'departments': departments
	        });
	    }).catch(function(err) {
	    	return res.serverError(err);
	    })
	},

	getDepartment2: function(ID) {
		AcademicStaff.findOne({staffID: ID})
	}
};