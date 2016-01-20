/**
 * RegularStaffController
 *
 * @description :: Server-side logic for managing Regularstaffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	test: function(req, res){
		var id = req.param('id');
		AcademicStaff.findOne({staffID: id})
		.then(function(AcademicStaff){
			if(AcademicStaff===undefined)
			return res.json({notFound:true});
			//Get departments
			var departments = AcademicStaff_Department.find( { staffID : AcademicStaff.staffID } ).populate('departmentID').then(function(departments){
	                console.log(departments);
	                return departments;
	        });
			return [AcademicStaff.staffID, AcademicStaff.firstName, AcademicStaff.lastName, departments];

		}).spread( function(staffID, firstName, lastName, departments ){
	        return res.json({
	        	'staffID': staffID,
	            'firstName': firstName, 
	          	'lastName': lastName,
	            'departments': departments
	        });
	    }).catch(function(e) {
	    	console.log("You must define an ID first");
	    })
	}
};

