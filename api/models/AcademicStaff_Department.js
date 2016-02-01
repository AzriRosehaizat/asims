/**
* AcademicStaff_Department.js
*
* @description :: Associates Academic Staff to the Departments to which they are associated, and provides contextual information describing the relationship.
* @author: A.A.
*/

module.exports = {

	attributes: {
		academicStaffDepartmentID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		academicStaffID: {
			model: 'AcademicStaff',
			required: true
		},
		departmentID: {
			model: 'Department',
			required: true
		}, 
		startDate:{
			type: 'date',
			required: true
		},
		endDate:{
			type: 'date'
		},
		isPrimaryDepartment: {
			type: 'boolean',
			//Make it primary department by default
			//ToDO create lifecycle callback for checking new additions.
			defaults: 1
		}
		

	},
  	tableName: 'AcademicStaff_Department'
};
