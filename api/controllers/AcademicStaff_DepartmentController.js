/**
 * AcademicStaff_DepartmentController
 *
 * @description :: Server-side logic for managing Academicstaff_departments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    update: function(req, res) {
        
        var title = req.param("title");
        var data = {
            id: req.param("academicStaffDepartmentID"),
            departmentID: req.param("departmentID"),
            startDate: req.param("startDate"),
            endDate: req.param("endDate")
        };
        
        if (_.isObject(title)) {
            data.departmentID = title.obj.departmentID;
        }
        
        AcademicStaff_Department.update({academicStaffDepartmentID: data.id}, data).exec(function(err, updated) {
            if (err) {
                return res.negotiate(err);
            }
            
            AcademicStaff_Department.findOne({academicStaffDepartmentID: data.id}).populate('departmentID').exec(function(err, populated) {
                if (err) {
                    return res.negotiate(err);
                }
                
                populated.facultyID = populated.departmentID.facultyID;
                populated.departmentCode = populated.departmentID.departmentCode;
                populated.title = populated.departmentID.title;
                populated.departmentID = populated.departmentID.departmentID;
                
                res.json(populated);
            });
        });
    }
};
