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
		//Join table AcademicStaff_Department 1:M
		belongsToDepartment:{
			collection: 'AcademicStaff_Department',
			via: 'staffID'
		},
		//reference to employment table 1:M
		hasEmployments:{
			collection: 'Employment',
			via: 'staffID'
		},
		//Join table AcademicStaff_Section 1:M
		teachesSection:{
			collection: 'AcademicStaff_Section',
			via: 'staffID'
		},
		//has contract staffs 1:M
		// hasCAS:{
		// 	collection: 'ContractStaff',
		// 	via: 'contractStaffID'
		// },
		//has regular staffs 1:M
		hasRAS: {
			collection: 'RegularStaff',
			via: 'regularStaffID'
		}

	},
	tableName: 'AcademicStaff'
};