/**
* AcademicStaff.js
*
* @description :: Contains information pertaining to both Regular Academic Staff, and Contract Academic Staff.
* @author      :: A.A.
*/

module.exports = {

	attributes: {
		staffID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		firstName: {
			type: 'string',
			size: 50,
			required: true
		},
		lastName: {
			type: 'string',
			size: 50,
			required: true
		},
		//reference to employment table 1:M
		hasEmployments:{
			collection: 'Employment'
		},
		//Join table AcademicStaff_Department 1:M
		staff_Dept:{
			collection: 'AcademicStaff_Department',
			via: 'staffID'
		},

		//Join table AcademicStaff_Section 1:M
		staff_Sect:{
			collection: 'AcademicStaff_Section',
			via: 'staffID'
		}
	},
	tableName: 'AcademicStaff'
};