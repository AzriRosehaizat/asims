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
		}
		

	},
  	tableName: 'AcademicStaff_Department'
};
