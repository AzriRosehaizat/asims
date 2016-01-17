
/**
 * UserController.js 
 * 
 * @module      :: Service
 * @description :: Provide services for staff related methods
 *                 
 *                
 */

module.export = {
	getRAS: function(req, res){
			//Return a list of all RAS ID
			RegularStaff.find({ select: ['academicStaffID'] ;
		},function(err, RAS){
			if (err) return res.negotiate(err);           
	  		return res.json(RAS); 
		});
	},

	//Get department given a related staff ID
	getDepartment: function(req, res){
	var ID = req.param
	AcademicStaff.findOne({staffID: ID})
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