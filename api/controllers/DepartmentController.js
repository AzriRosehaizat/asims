/**
 * DepartmentController
 *
 * @description :: Server-side logic for managing Departments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getAllDepartment: function(req, res) {
        var departmentID = req.param('departmentID');
        DepartmentService.getAllDepartment(departmentID, function(err, result) {
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
            type: req.param('type')
        };
        switch (data.type) {
            case 'course':
                DepartmentService.getCourse(data.id, responseFn)
                break;
            case 'regularStaff':
                DepartmentService.getRegularStaff(data.id, responseFn)
                break;
            case 'contractStaff':
                DepartmentService.getContractStaff(data.id, responseFn)
                break;
            default:
                res.serverError();
                console.log("Incorrect REST url");
        }
    }
};
