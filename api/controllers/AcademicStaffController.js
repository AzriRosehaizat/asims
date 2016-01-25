/**
 * AcademicStaffController
 *
 * @description :: Server-side logic for managing Academicstaffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	find : function( req, res ){
	    AcademicStaffService.find( {}, {}, 
	        function( error, academicStaffs){
	            res.json(academicStaffs);
	        }
	    );
	},
	
	test: function(req, res){
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
	}
};
