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
		employeeNo: {
			type: 'string',
			size: 50
		},
		//Join table AcademicStaff_Department 1:M
		AcademicStaff_Department: {
			collection: 'AcademicStaff_Department',
			via: 'staffID'
		},
		//Join table AcademicStaff_Section 1:M
		AcademicStaff_Section: {
			collection: 'AcademicStaff_Section',
			via: 'staffID'
		},
		//has contract staffs 1:M
		ContractStaff: {
			collection: 'ContractStaff',
			via: 'academicStaffID'
		},
		//has regular staffs 1:M
		RegularStaff: {
			collection: 'RegularStaff',
			via: 'academicStaffID'
		}
	},
	tableName: 'AcademicStaff'
};