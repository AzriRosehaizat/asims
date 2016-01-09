/**
* AcademicStaff_Department.js
*
* @description :: Associates Academic Staff to the Departments to which they are associated, and provides contextual information describing the relationship.
* @author: A.A.
*/

module.exports = {

	attributes: {
		staffID: {
			model: 'AcademicStaff',
			required: true
		},
		departmentID: {
			model: 'Department',
			required: true
		}, 
		startDate:{
			type: 'date',
			primaryKey: 'true',
			index: 'true'
		},
		endDate:{
			type: 'date'
		}
		

	},
  	tableName: 'AcademicStaff_Department'
};
