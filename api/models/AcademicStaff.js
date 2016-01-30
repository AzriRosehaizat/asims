/**
 * AcademicStaff.js
 *
 * @description :: Contains information pertaining to both Regular Academic Staff, and Contract Academic Staff.
 * @author      :: A.A.
 */

module.exports = {
	attributes: {
		academicStaffID: {
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

		}
		// ,
		// employeeNo: {
		// 	type: 'string',
		// 	size: 50
		// },
		// //Join table AcademicStaff_Department 1:M
		// AcademicStaff_Department: {
		// 	collection: 'AcademicStaff_Department',
		// 	via: 'academicStaffID'
		// },
		// //Join table AcademicStaff_Section 1:M
		// AcademicStaff_Section: {
		// 	collection: 'AcademicStaff_Section',
		// 	via: 'academicStaffID'
		// },
		// //has contract staffs 1:M
		// ContractStaff: {
		// 	collection: 'ContractStaff',
		// 	via: 'academicStaffID'
		// },
		// //has regular staffs 1:M
		// RegularStaff: {
		// 	collection: 'RegularStaff',
		// 	via: 'academicStaffID'
		// },
		// //teaching activites 1:M
		// TeachingActivities: {
		// 	collection: 'TeachingActivities',
		// 	via: 'academicStaffID'
		// }
	},
	tableName: 'AcademicStaff'
};